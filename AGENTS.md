# Webkowsky Repo Agent Guide

This file is the permanent operating guide for agents working in this repository.
It defines how to understand the project, how to make release decisions, and how
to version every deploy in a consistent way.

## Project Identity

- This repository is the production codebase for the Webkowsky marketing website.
- The repo is a monorepo with two active applications:
  - `frontend/` is the Next.js application deployed on Vercel.
  - `studio/` is the Sanity Studio used to manage content.
- The repository root coordinates shared scripts, release workflow, and workspace commands.
- The main engineering priorities are:
  - safe delivery of production changes,
  - stable deploys,
  - consistency between the frontend, Sanity content model, and Vercel hosting.

## Repo Map

- Run shared commands from the repository root unless a task explicitly targets one workspace.
- `frontend/` is the Vercel root directory.
- `studio/` is a separate runtime and deployment surface for content editing.
- Primary local sources of truth:
  - `README.md`
  - `docs/homepage-workflow.md`
  - `package.json`
  - `CHANGELOG.md`

## Branch Workflow

- The canonical long-lived branches are:
  - `main` for production-ready code and stable releases,
  - `staging` for shared preview, integration, and pre-production QA.
- Use short-lived task branches only:
  - `feature/<task-name>` for new work, visual updates, and non-breaking improvements,
  - `fix/<task-name>` for bug fixes.
- Do not create permanent personal branches.
- Do not use branch-per-section as a standing workflow.
- Start every task branch from `staging` and merge it back into `staging` through a pull request.
- Merge from `staging` into `main` only when the integrated batch is approved for release.
- Stable tags `vX.Y.Z` must be created from `main`.
- Preview tags `vX.Y.Z-preview.N` should be created from `staging` after the preview commit already exists.
- During branch migration work, a legacy `test` branch may temporarily mirror `staging` until GitHub/Vercel settings are updated, but `staging` is the source of truth.

## Agent Operating Rules

- Inspect the repo first, then edit.
- Do not overwrite unrelated user changes.
- Treat release/version work as mandatory whenever a change is meant to ship.
- Before any deploy-related push, classify the change as `major`, `minor`, or `patch`.
- If a change touches deploy behavior, user-facing functionality, Sanity content structure, integrations, or repo workflow, semver classification is required before commit and push.
- If release, build, deploy, or semver rules change, update this file in the same task.

## Release Discipline

- Every deploy must have a version identifier.
- Stable production releases use annotated tags in the form `vX.Y.Z`.
- Preview deploys use annotated prerelease tags in the form `vX.Y.Z-preview.N`.
- Do not push a deploy-bound change without assigning the appropriate version first.
- `package.json` at the repo root is the source of truth for the latest stable version.
- Root version metadata must stay aligned with the latest stable tag before the next release is prepared.
- Fetch the latest tags before calculating a new release so preview suffixes are based on current tag history.

## Semver Decision Rubric

Agents must classify the release type without asking for confirmation unless the user explicitly overrides it.

### Major

Use `major` for breaking changes such as:

- changes that require migration or manual repair,
- removing or renaming Sanity fields used by the frontend,
- changing required environment variable contracts,
- changes that make existing content or the current deploy invalid,
- major restructuring of core homepage behavior that requires full end-to-end revalidation.

### Minor

Use `minor` for non-breaking feature additions such as:

- a new homepage section, new component, or new integration,
- new optional Sanity fields,
- expanded authoring or editing capabilities,
- new workflow automation or release tooling that does not break the existing process.

### Patch

Use `patch` for safe improvements such as:

- bug fixes,
- visual, copy, or styling refinements,
- telemetry or analytics additions that do not change public behavior contracts,
- safe configuration fixes,
- small DX or workflow improvements that do not change how the product behaves.

### Classification Examples

- Adding `@vercel/analytics` without breaking behavior is a `patch`.
- Adding a new Sanity-driven homepage section is a `minor`.
- Changing the schema in a way that breaks existing documents is a `major`.

## Release Checklist

Before a stable release:

1. Review the diff and classify it as `major`, `minor`, or `patch`.
2. Run the matching stable release command from the repo root.
3. Review the updated `package.json`, `package-lock.json`, and `CHANGELOG.md`.
4. Update the generated changelog entry so it accurately describes the release.
5. Run quality checks:
   - `npm run lint --workspace=frontend`
   - `npm run type-check --workspace=frontend`
   - optionally `npm run type-check`
6. Commit the release changes.
7. Create the annotated stable tag `vX.Y.Z`.
8. Push the commit and the tag.

Before a preview deploy:

1. Review the diff and classify it as `major`, `minor`, or `patch`.
2. Commit the code that is about to be previewed.
3. Ensure tracked files are clean.
4. Run the matching preview release command from the repo root.
5. Push the branch and the preview tag.

## Release Commands

Run all release commands from the repository root.

### Stable release preparation

- `npm run release:patch`
- `npm run release:minor`
- `npm run release:major`

These commands:

- bump the root stable version,
- sync the root package lock version metadata,
- roll the current `Unreleased` changelog section into a dated release entry,
- reset `Unreleased` to a fresh template.

They do not create the stable tag automatically. Create the tag only after reviewing and committing the release files.

### Preview prerelease tagging

- `npm run release:preview:patch`
- `npm run release:preview:minor`
- `npm run release:preview:major`

These commands:

- calculate the next target stable version from the current root version,
- create the next preview tag for that target version,
- do not modify `package.json`,
- do not modify `CHANGELOG.md`.

Preview commands create the tag on the current `HEAD`, so they must be run only after the preview commit already exists.

## GitHub Releases

- GitHub releases are created automatically from pushed tags by `.github/workflows/release.yml`.
- Stable tags publish normal releases.
- Preview tags publish prereleases.
- The tag name is the release name so each version is directly clickable in GitHub.

## Design Workflow Rule

- Do not store private Figma links in this file.
- This project uses a Figma-heavy design workflow, but private design URLs must stay out of repo-level permanent instructions.
- For design implementation tasks:
  - first use local repo context such as component comments, node IDs, asset references, and workflow docs,
  - then use current user-provided design context if needed.

## Documentation Maintenance

- Every stable release must update `CHANGELOG.md`.
- Any change to release process, build process, deploy process, or semver policy must update `AGENTS.md`.
