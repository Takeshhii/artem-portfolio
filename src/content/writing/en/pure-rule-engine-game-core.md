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

<figure class="diagram-figure">
<svg class="diagram" viewBox="0 0 720 330" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>What the rule engine reads, and the one field it never reads</title>
  <rect x="238" y="86" width="244" height="150" rx="10" fill="var(--accent)" fill-opacity="0.09" stroke="var(--accent)" stroke-width="1.6"/>
  <text x="360" y="122" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent)">RuleEngine</text>
  <text x="360" y="146" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.72">pure functions</text>
  <text x="360" y="165" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.72">no DOM, no audio</text>
  <text x="360" y="184" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.72">no module state</text>
  <text x="360" y="212" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.9" font-family="ui-monospace, monospace">Violation | null</text>
  <g font-size="13" fill="currentColor">
    <text x="24" y="106">visitor.claim</text>
    <text x="24" y="140">rules (data)</text>
    <text x="24" y="174">station roster</text>
    <text x="24" y="208">dive log</text>
  </g>
  <g stroke="currentColor" stroke-width="1.3" opacity="0.7">
    <line x1="150" y1="101" x2="232" y2="120"/>
    <line x1="140" y1="135" x2="232" y2="146"/>
    <line x1="152" y1="169" x2="232" y2="172"/>
    <line x1="120" y1="203" x2="232" y2="198"/>
  </g>
  <g>
    <text x="556" y="140" font-size="13" fill="var(--accent-rose)" font-weight="600">visitor.truth</text>
    <text x="556" y="162" font-size="12" fill="currentColor" opacity="0.7">never read</text>
    <text x="556" y="180" font-size="12" fill="currentColor" opacity="0.7">never rendered</text>
    <line x1="488" y1="150" x2="546" y2="140" stroke="var(--accent-rose)" stroke-width="1.4" stroke-dasharray="5 4"/>
    <line x1="508" y1="132" x2="528" y2="158" stroke="var(--accent-rose)" stroke-width="2"/>
    <line x1="528" y1="132" x2="508" y2="158" stroke="var(--accent-rose)" stroke-width="2"/>
  </g>
  <text x="360" y="288" text-anchor="middle" font-size="12.5" fill="currentColor" opacity="0.72">The engine can prove a document is inconsistent.</text>
  <text x="360" y="308" text-anchor="middle" font-size="12.5" fill="currentColor" opacity="0.72">It can never tell you whether the thing at the airlock is a person.</text>
</svg>
<figcaption>Everything the engine reads, and the one field it does not. That omission is what keeps the judgement with the player.</figcaption>
</figure>

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
