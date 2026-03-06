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

## [0.11.0] - 2026-03-06

### Added

- Added SVG preview thumbnails plus shared grid/list insert-menu views for homepage and page-builder sections in Studio.
- Added a settings bootstrap fixture for the current global navigation and footer content.

### Changed

- Updated Studio homepage and page schemas to reuse the same page-builder insert-menu preview configuration.
- Updated frontend settings fetching and link resolution to prefer draft settings data during editing and strip stega markers from rendered link values.

### Fixed

- Fixed header and footer Visual Editing behavior so optimistic updates keep working across draft and published settings IDs.
- Fixed drag-and-drop bindings for header navigation, footer legal links, and footer link cloud lines in Visual Editing.
## [0.10.0] - 2026-03-04

### Added

- Added a shared section catalog so homepage sections can also be used in `page.pageBuilder[]`.
- Added optimistic drag-and-drop Visual Editing support for homepage sections, page builder sections, and settings arrays.
- Added nested drag-and-drop data bindings for homepage and legacy section lists (badges, cards, logos, FAQs, plans, and features).

### Changed

- Unified homepage and page-builder rendering through a shared `_type` section renderer.
- Expanded `getPageQuery` and generated Sanity types to include the shared homepage section model in `pageBuilder[]`.
- Extended the CMS workflow documentation with a Visual DnD 0.10 QA checklist for homepage, pages, and settings.

### Fixed

- Aligned repository release metadata with the existing `v0.9.3` stable baseline before preparing `v0.10.0`.

## [0.9.3] - 2026-03-04

### Added

- _None_

### Changed

- Recorded the hosted Sanity Studio deployment for the current CMS-driven homepage and global settings rollout.
- Aligned the cloud Studio deployment to use the production preview origin `https://www.webkowsky.com`.

### Fixed

- Restored editing parity between localhost Studio and the hosted `webkowsky-studio.sanity.studio` deployment.

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
