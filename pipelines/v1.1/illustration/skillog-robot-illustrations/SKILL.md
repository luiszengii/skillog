---
name: skillog-robot-illustrations
description: Generate or edit white-background hand-drawn illustrations featuring the fixed Skillog robot. Use for Skillog or 万术录 mascot scenes, Skill introductions, article illustrations, visual metaphors, shot lists, character-consistent variants, and targeted corrections; do not use for unrelated robots or generic illustration work.
---

# Skillog Robot Illustrations

Turn one Skill, workflow, judgment, state, or metaphor into a sparse hand-drawn scene in which the approved Skillog robot performs the core action. Preserve the robot as a recurring identity rather than redesigning it for each image.

This skill adapts the white-background explanatory-illustration approach of [Ian Xiaohei Illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) by Ian. The Skillog robot, violet identity system, reference sheet, and character rules are specific to Skillog; do not reproduce the Xiaohei character.

## Required resources

- Always use `assets/skillog-robot-reference.png` as the character identity and construction reference when generating a new mascot image.
- Read `references/robot-ip.md` before generating or editing the robot.
- Read `references/style-dna.md` when writing or tuning an image prompt.
- Read `references/prompt-template.md` when generating an image or a shot list.
- Read `references/qa-checklist.md` after generation and before delivery.

## Workflow

1. Extract one cognitive anchor from the supplied Skill or content: its result, transformation, bottleneck, judgment, or workflow action. Do not illustrate every feature.
2. Translate that anchor into one simple physical action using at most one or two low-tech objects. The robot must pull, carry, sort, connect, inspect, repair, reveal, or otherwise perform the action; it cannot merely pose beside the idea.
3. Choose the canvas from the intended use:
   - Default to `3:4` portrait for Skillog/Xiaohongshu post artwork.
   - Use `16:9` landscape for article-body illustrations when requested or clearly implied.
   - Follow any explicit user dimensions.
4. If the user requests a plan or asks where illustrations belong, return a concise shot list first. If the user asks to generate, make, or output images, proceed directly with the built-in image-generation tool; generate each standalone scene separately unless a character sheet or comic is explicitly requested.
5. Label reference-image roles explicitly in the generation prompt. The bundled reference sheet controls identity and construction. Other supplied images may control style, composition, or subject only; they must not override the fixed robot structure.
6. Keep text optional. When labels help, use only a few short Chinese handwritten labels. Do not add headings, explanatory paragraphs, or invented copy.
7. Inspect the result against `references/qa-checklist.md`. Use one targeted edit at a time. Repeat every character invariant during edits so a style correction does not redesign the robot.

## Character consistency over style variation

The approved reference sheet is authoritative for silhouette, proportions, face screen, eyes, antenna, ear pads, limbs, violet `S`, and blank rear shell. Prompt-controlled looseness may change line wobble, pressure, retracing, and small hand-drawn irregularities only. It must never change anatomy, component placement, or identity.

For Skillog workspace output, save the selected file under `posts/<content-id>-<slug>/artwork/` with a descriptive versioned name. Keep it beside the post it belongs to; do not put post-specific artwork in a repository-level `assets/` directory. Preserve existing artwork and the original generated file unless the user explicitly requests replacement.
