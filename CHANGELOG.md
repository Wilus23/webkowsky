# Changelog

All notable changes to this repository should be documented in this file.

The format is based on Keep a Changelog and this file tracks stable releases only.
Preview deploys are versioned through Git tags and GitHub prereleases, not through this changelog.

## [Unreleased]

### Added

- _None yet_

### Changed

- _None yet_

### Fixed

- _None yet_

## [0.9.2] - 2026-03-03

### Added

- Added Sanity-driven global settings fields for editable header navigation, header CTA, footer CTA, footer legal links, and footer copy.
- Added field-level visual editing hooks for more homepage content and global settings content.

### Changed

- Switched the homepage to fetch both homepage sections and global settings in a single CMS-driven render path.
- Restored missing homepage sections in the homepage singleton and improved section editing behavior for images, buttons, and tab-specific media.
- Updated the hero width behavior for large displays and restored the pricing card to a lighter visual treatment.

### Fixed

- Removed broken footer asset dependencies and replaced them with stable local SVG/CSS rendering.
- Reduced draft-mode rendering instability by disabling the custom cursor effect during visual editing and suppressing extension-driven hydration noise.

## [0.9.1] - 2026-03-02

### Added

- Added `@vercel/analytics` to the frontend layout for production analytics.
- Added a repo-level agent operating guide with semver and release rules.
- Added release scripts for stable and preview versioning from the repository root.
- Added automatic GitHub Releases publishing for pushed `v*` tags.

### Changed

- Aligned the root package version metadata with the existing `v0.9.0` stable tag.

### Fixed

- _None_

## [0.9.0] - 2026-02-27

### Added

- Established the homepage and Sanity schema release baseline.

### Changed

- _None_

### Fixed

- _None_
