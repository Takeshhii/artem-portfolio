---
title: 'What changes when you run SEO across a dozen sites instead of one'
excerpt: 'The work stops being optimisation and becomes inventory. What you need at twelve sites is not better tactics — it is knowing what you have.'
date: 2026-06-01
category: 'Growth'
tags: ['SEO', 'Process', 'Operations', 'Automation']
translationKey: 'seo-across-many-sites'
---

Running search for one site and running it for twelve are not the same job scaled
up. They're different jobs.

On one site, you hold the whole thing in your head. You know which pages matter,
what changed last week, and which template that odd title came from. Nothing has
to be written down because you *are* the documentation.

That model breaks somewhere around the third or fourth site, and it breaks
quietly. You don't notice you've lost track. You notice a page that has been
returning a 404 for six weeks.

## The first thing that breaks is memory, not capacity

The instinct when you take on more sites is that you need to work faster. That's
usually wrong. The actual failure is that you no longer know the current state of
things.

Concretely, the questions that get hard:

- Which sites am I responsible for, and what is each one *for*?
- Which pages on each one actually earn anything?
- What changed since I last looked?
- Where did that redirect come from and who added it?

None of these are optimisation questions. They're inventory questions. At one
site you answer them from memory; at twelve you can't, and no amount of working
harder fixes it.

## Inventory before tactics

The thing that helped most was boring: a single list of every property, with the
same fields for each one. Platform, who owns the content, what the site is
commercially for, where analytics lives, when it was last audited.

That sounds like admin work rather than SEO. It is. It's also the thing that made
the rest possible, because you cannot prioritise across sites you can't compare.

Once the list existed, an obvious pattern appeared: the sites were not equally
worth the effort. Two of them drove most of the commercial value. Several were
maintenance-only and any hour spent optimising them was an hour not spent on the
two that mattered. Without the list, attention naturally goes to whichever site
someone last complained about.

## Detection scales, judgment doesn't

The work at this scale splits cleanly into two kinds.

**Detection is mechanical and should be automated.** Scheduled crawls across all
properties, diffed against last run. New 404s, changed titles, pages that fell
out of the sitemap, redirect chains that grew a hop. One report, all sites,
nothing to remember. I've written about
[where I draw the automation line](/writing/what-to-automate-in-seo) more
generally, and this is the clearest case for it — you're producing information,
not changing anything.

**Judgment doesn't scale and shouldn't be spread thin.** Deciding what a page
should say, whether a section deserves to exist, how the catalogue should be
structured. Doing this properly on two sites beats doing it badly on twelve.

The mistake I made early was treating all twelve as needing the same attention.
They didn't. They needed the same *monitoring* and very different amounts of
thought.

## Standardise the layer under the content

The other thing that pays off across many sites is making the technical layer
identical wherever possible: same analytics setup, same sitemap conventions, same
structured data approach, same rules for what gets indexed.

Not because uniformity is elegant, but because it makes anomalies visible. When
eleven sites are configured the same way, the twelfth being different is a signal
you can actually see. When all twelve are bespoke, nothing stands out, and
problems hide in the variation.

This is the same instinct as the product-page structure I ended up with when I
[rebuilt a WordPress theme](/writing/wordpress-theme-technical-seo): consistency
isn't an aesthetic preference, it's what makes exceptions detectable.

## What I'd tell someone taking on their fourth site

Stop optimising for a moment and write down what you have. Every property, same
fields, one place.

Then automate detection across all of them before you touch a single title tag.
You will find things you didn't know were broken, and you'll stop spending your
attention on whichever site complained most recently rather than the one that
matters most.
