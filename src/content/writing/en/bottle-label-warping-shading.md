---
title: 'Making a flat label look wrapped around a bottle, in the browser'
excerpt: 'Two tricks do almost all the work: a cylindrical remap so the label compresses toward the silhouette, and stealing the real shading out of the photograph instead of painting it.'
date: 2026-08-24
category: 'Engineering'
tags: ['TypeScript', 'PixiJS', 'WebGL', 'Graphics', 'React']
translationKey: 'bottle-label-warping-shading'
---

Bottle Label Studio takes a flat label design and a photo of a blank bottle and
produces a product image. The goal was to remove the step where every label
variant needs either a reshoot or twenty minutes of manual warping in an image
editor.

Two techniques carry almost all of the realism. Neither is complicated; both are
easy to get subtly wrong.

## Problem one: a flat rectangle doesn't wrap

If you just stretch a label into a four-corner quad, it looks stuck on — a
sticker, not a wrap. The reason is that a real label on a round bottle doesn't
compress evenly. It compresses *toward the silhouette edges*, because you're
looking at a cylinder.

The fix is a cylindrical remap. Treat the horizontal coordinate `u` of the flat
label as an angle across the visible arc of the bottle:

```
θ = (u - 0.5) * arc
uCurved = 0.5 + sin(θ) / (2 * sin(arc / 2))
```

That's an orthographic projection of a cylinder. Because `sin` flattens near its
peak, interior columns spread out and columns near the edges bunch together —
which is exactly what your eye expects from a wrapped label.

The label is rendered as a subdivided mesh rather than a single quad. Each vertex
carries two things: a flat UV in `[0,1]²` that samples the label artwork, and a
warped XY in photo-pixel space that says where it lands. A
`(segments+1) × (segments+1)` grid, the remap above applied horizontally, and a
slight vertical bow so the top and bottom edges curve like the ellipse you
actually see on a cylinder viewed head-on.

The four corners of the label region still anchor everything through bilinear
interpolation, so a tilted or foreshortened photo maps correctly — perspective
from the quad, curvature from the remap.

## Problem two: a wrapped label with flat lighting still looks fake

Geometry alone isn't enough. A studio photo of a bottle has highlights and
shadows, and a label pasted over it with uniform brightness reads as an overlay
immediately.

The obvious solution is to hand-paint a highlight/shadow map per bottle template.
That works and it doesn't scale — every new bottle photo becomes an art task.

The approach I used instead: **borrow the shading that is already in the
photograph.**

1. Read the photo's luminance inside the label region — Rec. 601 luma, which
   tracks perceived brightness closely enough for studio plastic.
2. Normalise it against the brightest point *within that region*, so only
   relative light and shade transfer and the label keeps its own base brightness.
3. Output that as a greyscale map and composite it over the warped label with
   `multiply`, masked to the label silhouette.

Where the bottle has a highlight, the label stays bright. Where it falls into
shadow, the label darkens by the same amount the bottle does.

The part that makes this cheap is an alignment property that falls out for free:
the shading is sampled in the photo's own screen space, and the warped label
lands in that same space. So the shading is automatically aligned to the wrap. No
second warp, no registration step, nothing to keep in sync.

That's the whole trick — and it's why adding a new bottle template is uploading a
photo and marking four corners, rather than producing artwork.

## What this buys and what it doesn't

It's an approximation, not a renderer. There's no refraction through glass, no
correct behaviour for a label crossing a hard specular edge, no awareness of
material. For a matte label on a cylindrical bottle photographed straight on, it
holds up. Push it toward transparent bottles or extreme angles and it stops
being convincing.

That was an acceptable trade because the actual job is narrow: turn a design
variant into a usable product image without a reshoot. Building a physically
correct renderer would have been more interesting and much less useful.

Everything runs client-side and exports at the photo's native resolution — no
upload, no server round trip.

Source on [GitHub](https://github.com/Takeshhii/bottle-label-studio).
