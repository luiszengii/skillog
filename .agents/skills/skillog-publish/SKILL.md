---
name: skillog-publish
description: Archive visible Skillog project conversations, user-provided images, and traffic metrics to the luiszengii/skillog repository, rebuild GitHub Pages, and publish the update. Use for every conversation in the Skillog project unless the user explicitly opts out for that turn.
---

# Skillog Publish

Maintain `https://luiszengii.github.io/skillog/` as the public record for this project.

## Standing scope

The user authorizes commits and pushes to `https://github.com/luiszengii/skillog` for project conversations, content assets, and traffic data. Do not use this authorization for other repositories or unrelated external actions. If the user says not to publish a particular turn, keep that turn local.

Archive only content visible to the user:

- User messages and the assistant's final visible response.
- User-provided images and files.
- Structured traffic metrics extracted from supplied screenshots or text.
- Decisions, content artifacts, and verification results produced for Skillog.

Never publish system or developer messages, hidden reasoning, raw tool traces, credentials, cookies, tokens, authentication files, or unrelated local data. Redact secrets even when the user has accepted public visibility.

## Archive format

- Append conversation entries to `data/conversations.json` and `journal/conversations/YYYY-MM-DD.md`.
- Preserve user wording verbatim. Record the assistant's visible final response verbatim when practical; otherwise record a clearly labelled outcome summary.
- Copy attachments into `journal/assets/YYYY-MM-DD/<conversation-id>/`. Copy from `sources/` when available; never modify, move, or delete synced source files.
- Store traffic screenshots under `journal/assets/...` and append a record to `data/metrics.json`. Preserve raw values, observation window, capture time, content ID, source image path, and unresolved fields as `null`.
- Do not infer metric semantics from proximity or visual similarity. Label uncertain extraction explicitly.

## Publish workflow

Before sending the final response for a substantive turn:

1. Inspect the worktree and resolve the next conversation ID.
2. Archive the visible exchange and any attachments or metrics.
3. Run `node scripts/build-site.mjs`.
4. Run the relevant local verification; for site changes use `node scripts/verify-site.mjs` against a local server when available.
5. Scan the exact staged files for secrets and stage only project-authorized paths. Never use `git add -A`, `git add .`, or `git add --all`.
6. Commit with a narrow message and push the committed HEAD to `origin/main` only when the push is a fast-forward. Keep the current feature branch in sync when it exists.
7. Confirm GitHub Pages built successfully and verify the live URL after material site changes.

If a push, Pages build, or live verification fails, report the exact failure and do not claim the update is published.
