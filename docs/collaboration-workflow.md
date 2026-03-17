# Collaboration Workflow

This repository uses a deliberately small Git workflow for a two-person team.

## Branches

- `main` = production
- `staging` = shared preview and integration
- `feature/<task-name>` = normal work branch
- `fix/<task-name>` = bugfix branch

Do not create permanent personal branches.

## Daily Flow

1. Pull the latest `staging`.
2. Create a new branch from `staging`.
3. Work only on that task.
4. Push the branch to GitHub.
5. Open a pull request into `staging`.
6. Review the preview.
7. Merge into `staging`.
8. Delete the task branch after merge.

## When To Use Git

Use a Git branch for:

- component/layout changes,
- new sections,
- schema changes,
- frontend query changes,
- tracking and technical fixes.

Do not use a Git branch for content-only changes in Sanity such as:

- copy,
- images,
- CTA labels and links,
- FAQ content,
- homepage SEO,
- section order in the existing CMS flow.

Those changes should go through the Sanity `staging` dataset and preview flow instead.

## Team Rules

- Only `main` is production.
- `staging` is the only shared integration branch.
- One task branch should cover one concrete change.
- If a task changes homepage structure, section registry, shared link/button schema, or generated Sanity artifacts, only one person should own that task at a time.
- Merge to `main` only after the `staging` batch is approved.
