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

## Never publish

- System or developer messages
- Hidden reasoning
- Raw tool logs
- Credentials, cookies, tokens, auth files, or secrets
- Unrelated local data

The site is public but requests search engines not to index it. This is not access control.
