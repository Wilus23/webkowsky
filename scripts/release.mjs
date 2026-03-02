#!/usr/bin/env node

import {execFileSync} from 'node:child_process'
import {readFileSync, writeFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const VALID_MODES = new Set(['preview', 'stable'])
const VALID_BUMPS = new Set(['major', 'minor', 'patch'])
const SECTION_ORDER = ['Added', 'Changed', 'Fixed', 'Removed']
const UNRELEASED_TEMPLATE = `## [Unreleased]

### Added

- _None yet_

### Changed

- _None yet_

### Fixed

- _None yet_`

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const packagePath = path.join(repoRoot, 'package.json')
const packageLockPath = path.join(repoRoot, 'package-lock.json')
const changelogPath = path.join(repoRoot, 'CHANGELOG.md')

function fail(message) {
  console.error(message)
  process.exit(1)
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) {
    fail(`Invalid semver version: ${version}`)
  }

  return {
    major: Number.parseInt(match[1], 10),
    minor: Number.parseInt(match[2], 10),
    patch: Number.parseInt(match[3], 10),
  }
}

function formatVersion(version) {
  return `${version.major}.${version.minor}.${version.patch}`
}

function compareVersions(left, right) {
  const a = parseVersion(left)
  const b = parseVersion(right)

  if (a.major !== b.major) {
    return a.major - b.major
  }

  if (a.minor !== b.minor) {
    return a.minor - b.minor
  }

  return a.patch - b.patch
}

function bumpVersion(version, bump) {
  const parsed = parseVersion(version)

  switch (bump) {
    case 'major':
      return formatVersion({major: parsed.major + 1, minor: 0, patch: 0})
    case 'minor':
      return formatVersion({major: parsed.major, minor: parsed.minor + 1, patch: 0})
    case 'patch':
      return formatVersion({major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1})
    default:
      fail(`Unsupported release bump: ${bump}`)
  }
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function git(args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function listTags() {
  const output = git(['tag', '--list', 'v*'])
  return output ? output.split('\n').map((tag) => tag.trim()).filter(Boolean) : []
}

function listStableTags(tags) {
  return tags
    .filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag))
    .map((tag) => tag.slice(1))
    .sort(compareVersions)
}

function ensureStableBaseline(currentVersion, stableTags) {
  if (stableTags.length === 0) {
    return
  }

  const latestStableVersion = stableTags[stableTags.length - 1]

  if (currentVersion !== latestStableVersion) {
    fail(
      `Root package version ${currentVersion} must match the latest stable tag ${latestStableVersion} before releasing.`,
    )
  }
}

function ensureTrackedFilesAreClean() {
  const status = git(['status', '--porcelain', '--untracked-files=no'])

  if (status) {
    fail('Preview tags must be created from a clean tracked working tree. Commit or stash tracked changes first.')
  }
}

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function nextPreviewTag(baseVersion, tags) {
  const matcher = new RegExp(`^v${escapeForRegExp(baseVersion)}-preview\\.(\\d+)$`)
  let maxSuffix = 0

  for (const tag of tags) {
    const match = matcher.exec(tag)
    if (!match) {
      continue
    }

    maxSuffix = Math.max(maxSuffix, Number.parseInt(match[1], 10))
  }

  return `v${baseVersion}-preview.${maxSuffix + 1}`
}

function createAnnotatedTag(tagName, message) {
  git(['tag', '-a', tagName, '-m', message])
}

function normalizeSectionContent(content) {
  const filteredLines = content
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.trim() !== '- _None yet_' && line.trim() !== '- _None_')

  const normalized = filteredLines.join('\n').trim()
  return normalized || '- _None_'
}

function extractSection(body, heading) {
  const matcher = new RegExp(`### ${heading}\\n([\\s\\S]*?)(?=\\n### |$)`)
  const match = matcher.exec(body)

  if (!match) {
    return null
  }

  return normalizeSectionContent(match[1])
}

function defaultReleaseBody(nextVersion) {
  return [
    '### Added',
    '',
    `- Stable release ${nextVersion}.`,
    '',
    '### Changed',
    '',
    '- _None_',
    '',
    '### Fixed',
    '',
    '- _None_',
  ].join('\n')
}

function buildReleaseBody(unreleasedBody, nextVersion) {
  const sections = []
  let hasRealContent = false

  for (const heading of SECTION_ORDER) {
    const content = extractSection(unreleasedBody, heading)

    if (!content) {
      if (heading === 'Removed') {
        continue
      }

      sections.push(`### ${heading}\n\n- _None_`)
      continue
    }

    if (content !== '- _None_') {
      hasRealContent = true
    }

    if (heading === 'Removed' && content === '- _None_') {
      continue
    }

    sections.push(`### ${heading}\n\n${content}`)
  }

  if (!sections.length) {
    return defaultReleaseBody(nextVersion)
  }

  if (!hasRealContent) {
    return defaultReleaseBody(nextVersion)
  }

  return sections.join('\n\n')
}

function nextDateStamp() {
  return new Date().toISOString().slice(0, 10)
}

function updateChangelog(changelog, nextVersion) {
  const marker = '## [Unreleased]\n'
  const start = changelog.indexOf(marker)

  if (start === -1) {
    fail('CHANGELOG.md must contain an "## [Unreleased]" section.')
  }

  const bodyStart = start + marker.length
  const nextHeader = changelog.indexOf('\n## [', bodyStart)
  const bodyEnd = nextHeader === -1 ? changelog.length : nextHeader
  const unreleasedBody = changelog.slice(bodyStart, bodyEnd).trim()
  const releaseBody = buildReleaseBody(unreleasedBody, nextVersion)
  const newSection = `${UNRELEASED_TEMPLATE}\n\n## [${nextVersion}] - ${nextDateStamp()}\n\n${releaseBody}`

  return `${changelog.slice(0, start)}${newSection}${changelog.slice(bodyEnd)}`
}

function main() {
  const [mode, bump, ...flags] = process.argv.slice(2)
  const dryRun = flags.includes('--dry-run')

  if (!VALID_MODES.has(mode)) {
    fail('Usage: node scripts/release.mjs <preview|stable> <major|minor|patch> [--dry-run]')
  }

  if (!VALID_BUMPS.has(bump)) {
    fail('Release bump must be one of: major, minor, patch.')
  }

  const packageJson = readJson(packagePath)
  const packageLock = readJson(packageLockPath)
  const currentVersion = packageJson.version
  const tags = listTags()
  const stableTags = listStableTags(tags)

  ensureStableBaseline(currentVersion, stableTags)

  const nextVersion = bumpVersion(currentVersion, bump)

  if (mode === 'preview') {
    const previewTag = nextPreviewTag(nextVersion, tags)

    if (dryRun) {
      console.log(`Preview release plan:`)
      console.log(`- current stable version: ${currentVersion}`)
      console.log(`- next target stable version: ${nextVersion}`)
      console.log(`- next preview tag: ${previewTag}`)
      return
    }

    ensureTrackedFilesAreClean()
    createAnnotatedTag(previewTag, `Preview release ${previewTag}`)
    console.log(`Created preview tag ${previewTag} on HEAD.`)
    return
  }

  if (tags.includes(`v${nextVersion}`)) {
    fail(`Stable tag v${nextVersion} already exists.`)
  }

  if (dryRun) {
    console.log(`Stable release plan:`)
    console.log(`- current stable version: ${currentVersion}`)
    console.log(`- next stable version: ${nextVersion}`)
    console.log(`- files to update: package.json, package-lock.json, CHANGELOG.md`)
    console.log(`- tag to create after commit: v${nextVersion}`)
    return
  }

  packageJson.version = nextVersion
  packageLock.version = nextVersion

  if (packageLock.packages && packageLock.packages['']) {
    packageLock.packages[''].version = nextVersion
  }

  const changelog = readFileSync(changelogPath, 'utf8')
  const nextChangelog = updateChangelog(changelog, nextVersion)

  writeJson(packagePath, packageJson)
  writeJson(packageLockPath, packageLock)
  writeFileSync(changelogPath, nextChangelog)

  console.log(`Prepared stable release ${nextVersion}.`)
  console.log('Updated package.json, package-lock.json, and CHANGELOG.md.')
  console.log(`Commit the release files, then create and push tag v${nextVersion}.`)
}

main()
