---
title: 'SEO automation: what to automate and what to leave alone'
excerpt: 'A working rule after automating a lot of SEO work: automate what is identical every time and cheap to verify. Everything else just produces mistakes faster.'
date: 2026-07-01
category: 'SEO'
tags: ['SEO', 'Automation', 'Technical SEO', 'Process']
translationKey: 'what-to-automate-in-seo'
---

Most SEO work is repetitive. That makes it look like it should all be automated,
and that instinct is how people end up with a site full of near-duplicate pages
and a redirect map nobody understands.

After building content pipelines and technical SEO tooling across several
properties, the rule I've settled on is narrower than "automate the repetitive
parts":

> Automate work that is identical every time **and** cheap to verify. Leave
> everything else alone.

Both halves matter. Repetition alone isn't enough.

<figure class="diagram-figure">
<svg class="diagram" viewBox="0 0 720 440" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Two axes: how much judgment a task needs, and what a mistake costs</title>
  <defs>
    <marker id="ar-m" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor"/>
    </marker>
  </defs>
  <rect x="72" y="40" width="300" height="300" fill="var(--accent-teal)" opacity="0.10"/>
  <text x="222" y="196" text-anchor="middle" font-size="15" fill="var(--accent-teal)" font-weight="600">SAFE TO AUTOMATE</text>
  <text x="222" y="218" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.65">low judgment, cheap visible errors</text>
  <rect x="372" y="40" width="276" height="300" fill="var(--accent-rose)" opacity="0.13"/>
  <text x="510" y="196" text-anchor="middle" font-size="15" fill="var(--accent-rose)" font-weight="600">KEEP MANUAL</text>
  <text x="510" y="218" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.65">judgment, or expensive to reverse</text>
  <line x1="72" y1="340" x2="660" y2="340" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-m)"/>
  <line x1="72" y1="340" x2="72" y2="32" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-m)"/>
  <text x="366" y="378" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.75">cost of a mistake, and how visible it is</text>
  <text x="-190" y="26" transform="rotate(-90)" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.75">judgment required</text>
  <g font-size="13" fill="currentColor">
    <circle cx="140" cy="300" r="4" fill="var(--accent-teal)"/><text x="152" y="304">crawls and diffs</text>
    <circle cx="150" cy="262" r="4" fill="var(--accent-teal)"/><text x="162" y="266">reporting</text>
    <circle cx="196" cy="120" r="4" fill="var(--accent-teal)"/><text x="208" y="124">schema from CMS fields</text>
    <circle cx="300" cy="86" r="4" fill="var(--accent)"/><text x="312" y="90">draft generation (gated)</text>
    <circle cx="470" cy="290" r="4" fill="var(--accent-rose)"/><text x="482" y="294">redirects</text>
    <circle cx="520" cy="150" r="4" fill="var(--accent-rose)"/><text x="532" y="154">canonicals, indexing</text>
    <circle cx="560" cy="86" r="4" fill="var(--accent-rose)"/><text x="572" y="90">what to publish</text>
  </g>
</svg>
<figcaption>The two axes. Automation is safe in the lower-left corner and gets dangerous fast in either direction.</figcaption>
</figure>

## The two-axis test

Before automating a task, I put it on two axes.

**How much judgment does it need?** Generating a meta description from a page's
content is mechanical. Deciding whether a page should exist at all is not.

**What does a mistake cost, and can I see it?** A malformed title tag is visible
in a crawl and fixable in minutes. A wrong `rel=canonical` shipped across a
thousand product pages is invisible in the interface, takes weeks to surface in
search, and takes longer to recover from.

Automation is safe in the corner where judgment is low and errors are cheap and
visible. It gets dangerous fast as you move along either axis.

## What I automate without hesitation

- **Crawling and diffing.** Scheduled crawls that flag what changed — new 404s,
  titles that shifted, pages that dropped out of the sitemap. This is pure
  detection. It never writes anything.
- **Structured data generation.** Schema built from fields that already exist in
  the CMS. Deterministic input, validatable output.
- **Internal link auditing.** Finding orphans and broken internal links. Again:
  reports, not edits.
- **Reporting.** Pulling Search Console and analytics into one place on a
  schedule. Nobody should be doing this by hand.
- **First-draft content generation** — but only behind validation, and only from
  briefs a human wrote. I've written separately about
  [the pipeline that does this](/writing/llm-content-pipeline-wordpress).

The pattern: most of these produce information rather than changes. Detection
automates cleanly. Mutation doesn't.

## What I keep manual

- **Deciding what to publish.** Topic selection needs to know the business — the
  margin on a product line, which client questions actually come up, what the
  sales team is hearing. A model has none of that context.
- **Redirects.** Cheap to write by hand, catastrophic in bulk when wrong. A bad
  redirect map silently strips authority and the symptom shows up months later
  as "traffic drifted down."
- **Canonicals and indexing directives.** Same reason. These are instructions to
  a search engine about what is real; getting them wrong at scale is one of the
  few genuinely hard things to undo.
- **Anything touching an existing ranking page.** If a page already performs, the
  expected value of an automated edit is negative. Leave it.

## The failure mode nobody warns you about

The interesting failures aren't dramatic. They're quiet and cumulative.

Generated content that individually passes review, but where article forty is a
paraphrase of article twelve — so the site ends up competing with itself for the
same query. Programmatic pages built from a template that were fine at fifty
pages and thin at five hundred. A redirect chain that grew one hop at a time
until it was four deep.

None of these announce themselves. They show up as a slow decline that's hard to
attribute, which is exactly why the validation layer matters more than the
generation layer. If you take one thing from this: build the check before you
build the thing that needs checking.

## A practical sequence

If you're starting to automate SEO work, this order has worked for me:

1. **Automate detection first.** Crawls, diffs, alerts. You immediately get value
   and you risk nothing.
2. **Automate reporting.** Frees real hours, still writes nothing.
3. **Automate generation with a human gate.** Drafts into a queue, not into
   production.
4. **Only then automate anything that writes to the site** — and only where you
   can verify the result mechanically.

Most people start at step three or four. That's the part that's fun to build. It's
also the part where the mistakes are expensive, and where you have the least
tooling to notice them.
