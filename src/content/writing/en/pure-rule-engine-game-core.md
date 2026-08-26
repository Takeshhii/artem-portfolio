---
title: 'A pure rule engine at the centre of a game — and the thing I kept out of it'
excerpt: 'The engine checks documents against rules and returns conflicts. What it deliberately does not know is whether the visitor is human. That omission is the design.'
date: 2026-08-24
category: 'Engineering'
tags: ['TypeScript', 'Architecture', 'Testing', 'Game Development']
translationKey: 'pure-rule-engine-game-core'
---

ШЛЮЗ is a document-checking game. A visitor arrives at an airlock, claims to be a
member of the crew, and you decide whether to let them in. Rules govern what a
valid claim looks like — R1 through R10, each comparing something the visitor
says against something the station knows.

The core of it is a rule engine that is entirely pure. No DOM, no audio, no
module-level state. It takes a visitor, a rule and the station's state, and
returns either a violation or `null`.

```ts
type Check = (visitor: Visitor, rule: Rule, station: StationState) => Violation | null;
```

That signature is most of the architecture.

## Rules are data, checks are functions

Each rule in `rules.json` has an id, the text shown to the player, a check type
and parameters. The engine maps a check type to a function. Adding a rule is a
JSON edit; adding a *kind* of rule is a new function.

This split mattered more than expected during content work. Most balance changes
— tightening a tolerance, changing which field a rule compares — are data edits
that need no rebuild of the logic and can't introduce a crash. The set of things
a designer can break is bounded by the schema.

## A violation carries the two facts that conflict

The thing I'd repeat in other projects: a violation isn't a boolean or an error
code. It carries the two facts that disagree.

```ts
violation(rule, fact(labels.a, claimedValue, 'CLAIM'), fact(labels.b, actualValue, 'ROSTER'))
```

The UI never has to reconstruct *why* something failed — it renders `factA`
against `factB` and the reason is self-evident. The debug panel and the
end-of-shift report use the same structure with no special casing.

This is a small decision that removes a whole category of drift, where the
message shown to the user gradually stops matching what the code actually
checked. Here they can't diverge, because the message is assembled from the
values the check compared.

## The important part: the engine does not know the truth

Here's the design decision the whole game rests on.

Every visitor has a `truth` field — what they actually are. The rule engine never
reads it. It cannot tell you whether the thing at the airlock is a person.

All the engine does is compare documents against records. A visitor can be fully
compliant on every rule and not be human. A real crew member can violate a rule
because the roster is out of date.

If the engine knew the truth, there would be a correct answer computable from the
data, and the game would collapse into an audit exercise — read the panels, apply
the rules, get the score. Withholding it means the rules can only ever be
evidence, and the actual judgement stays with the player, who has to weigh what
the panels say against what they see through the porthole.

Mechanically this is one field the engine doesn't read. Structurally it's the
difference between a puzzle and a game about doubt.

## Purity made the tests worth writing

Because the engine is pure functions over plain data, testing it needs no
harness, no DOM, no fixtures beyond the data structures themselves. Around thirty
tests cover the checks — including the cases that actually break things:

- **Tolerance boundaries.** A rule with a numeric range has to behave correctly
  exactly at the edge. Off-by-one at a boundary is invisible in play and produces
  a visitor who is inexplicably rejected.
- **Dead crew members.** A claim matching someone the roster lists as deceased
  needs a specific violation, not a silent pass. This one existed as a bug first
  and a test second.
- **Missing records.** A crew id absent from the roster entirely, versus present
  but mismatched, are different failures and shouldn't produce the same message.

None of that is remarkable testing. The point is that purity is what made it
cheap enough to actually do. When I've put game logic inside components before,
the tests needed the component, which needed the DOM, which needed a renderer —
and so they didn't get written.

## The general shape

Keep the part that makes decisions pure and data-driven. Push everything with a
side effect — rendering, sound, persistence — outside it. Then be deliberate
about what you *withhold* from the decision layer, because sometimes the
interesting behaviour comes from information the system doesn't have.

Source on [GitHub](https://github.com/Takeshhii/shlyuz); the game is playable
[here](https://dulcet-gnome-4fb2f6.netlify.app/).
