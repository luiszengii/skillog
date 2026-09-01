# Skillog Public Archive Workflow

The public archive is `https://luiszengii.github.io/skillog/` and its repository is `https://github.com/luiszengii/skillog`.

For every conversation in this project, archive the user-visible exchange before the final response unless the user explicitly opts out for that turn.

## Publish

- Store visible exchanges in `website/data/conversations.json` and `website/archive/conversations/YYYY-MM-DD.md`.
- Store user-provided files under `website/archive/assets/YYYY-MM-DD/<conversation-id>/` without modifying the original source.
- Store each post's extracted traffic metrics in its own `data/metrics.json`, and retain source screenshots under that post's `data/metrics/` directory with unresolved semantics preserved as `null`.
- Rebuild with `npm run build:site`.
- Stage only the exact authorized files, scan them for secrets, commit, and push a fast-forward update to `origin/main`.
- Verify Pages after material site changes.

## Content cards v1.0

- Keep each post's `content/`, `skill/`, `artwork/`, `data/`, and rendered `cards/` together under `posts/<content-id>-<slug>/`.
- Keep all structured data that belongs to one post under that post's `data/`; the website build reads it from there rather than maintaining a second copy.
- The card masthead contains only `INDEX <number>` at top left and `万术录` at top right.
- Do not render dates, page counters, or card footers. Xiaohongshu supplies its own browsing chrome.
- Render all four 1080 × 1440 cards with `npm run render:cards -- posts/<content-id>-<slug>/data/post.json` before publishing.

## Never publish

- System or developer messages
- Hidden reasoning
- Raw tool logs
- Credentials, cookies, tokens, auth files, or secrets
- Unrelated local data

The site is public but requests search engines not to index it. This is not access control.
