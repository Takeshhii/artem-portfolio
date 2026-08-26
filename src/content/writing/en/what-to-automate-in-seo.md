---
title: 'SEO automation: what to automate and what to leave alone'
excerpt: 'A working rule after automating a lot of SEO work: automate what is identical every time and cheap to verify. Everything else just produces mistakes faster.'
date: 2026-08-24
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
