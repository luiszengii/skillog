# Generation prompt template

Use this structure and omit fields that do not help the current image.

```text
Use case: stylized-concept
Asset type: Skillog {Xiaohongshu post artwork / article-body illustration / other use}

Input-image roles:
- The bundled Skillog robot reference sheet is the authoritative identity and construction reference.
- {Optional second image and its limited role: style / composition / subject only.}

Primary request:
Create one standalone {3:4 portrait / 16:9 landscape} white-background hand-drawn illustration about “{theme}”. It should communicate only this core idea: {core idea}.

Scene and action:
The same Skillog robot from the reference sheet is {concrete physical action}. The main objects are {one or two objects}. The robot performs the conceptual work rather than standing beside it.

Character identity lock:
One integrated white vertical rounded-rectangle capsule body with no separate head, torso, or neck; upper black rounded face screen; exactly two white vertical pill eyes; one centered ball-tip antenna; two white oval ear pads; one violet-blue capital “S” centered on the lower front only; thin black wire arms with dot hands; thin black wire legs with flat oval feet; plain unmarked rear shell. No mouth, eyebrows, fingers, clothing, armor, extra parts, or redesign.

Style:
Pure white background. Minimal thin black hand-drawn pen lines with standard slight looseness: gentle wobble, modest pressure variation, occasional subtle retracing and small natural asymmetry. Clear silhouette, large quiet white space, restrained absurd product-sketch feeling. Not cute, polished, vector-perfect, 3D, or infographic-like.

Text and color:
{No text / exact short handwritten labels in quotation marks}. Violet-blue only for the “S” and at most one tiny functional accent. {Optional semantic red/orange/blue marks only if needed.}

Composition:
The main subject occupies about 40%-60% of the canvas with at least 35% blank white space. One image, one core action, no title, no border, no dense diagram, no extra characters, no watermark.
```

## Shot-list fields

For planning without generation, provide only:

- placement or intended use;
- theme and single core idea;
- physical metaphor;
- robot action;
- one or two main objects;
- optional short labels;
- aspect ratio.

Do not expand a short piece into unnecessary illustrations. Prefer the smallest set that covers distinct cognitive anchors.

## Targeted iteration

For style-only correction, state:

```text
Change only the line treatment to {cleaner / standard slight looseness / slightly rougher}. Preserve the robot's exact construction, proportions, face screen, eyes, antenna, ear pads, violet S, limbs, pose, objects, composition, canvas, and all approved content. Do not redesign or reposition anything.
```
