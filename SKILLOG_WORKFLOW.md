# Skillog Public Archive Workflow

The public archive is `https://luiszengii.github.io/skillog/` and its repository is `https://github.com/luiszengii/skillog`.

For every conversation in this project, archive the user-visible exchange before the final response unless the user explicitly opts out for that turn.

## Publish

- Store visible exchanges in `data/conversations.json` and `journal/conversations/YYYY-MM-DD.md`.
- Store user-provided files under `journal/assets/YYYY-MM-DD/<conversation-id>/` without modifying the original source.
- Store extracted traffic metrics in `data/metrics.json`; retain the source screenshot and preserve unresolved semantics as `null`.
- Rebuild with `node scripts/build-site.mjs`.
- Stage only the exact authorized files, scan them for secrets, commit, and push a fast-forward update to `origin/main`.
- Verify Pages after material site changes.

## Content cards v1.0

- Keep each post's `post.json`, caption, results, illustration, and rendered `cards/` together under `posts/<content-id>-<slug>/`.
- Keep post-specific illustrations out of the repository-level `assets/`; that directory is reserved for shared brand assets.
- The card masthead contains only `INDEX <number>` at top left and `万术录` at top right.
- Do not render dates, page counters, or card footers. Xiaohongshu supplies its own browsing chrome.
- Render all four 1080 × 1440 cards with `node scripts/render-cards.mjs posts/<content-id>-<slug>/post.json` before publishing.

## Never publish

- System or developer messages
- Hidden reasoning
- Raw tool logs
- Credentials, cookies, tokens, auth files, or secrets
- Unrelated local data

The site is public but requests search engines not to index it. This is not access control.
