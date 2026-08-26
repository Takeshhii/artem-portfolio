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

<figure class="diagram-figure">
<svg class="diagram" viewBox="0 0 720 320" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Detection fans out across every site; judgment concentrates on a few</title>
  <text x="16" y="28" font-size="13" font-weight="600" fill="var(--accent-teal)">DETECTION — scales</text>
  <rect x="16" y="46" width="150" height="52" rx="8" fill="var(--accent-teal)" fill-opacity="0.12" stroke="var(--accent-teal)" stroke-width="1.4"/>
  <text x="91" y="70" text-anchor="middle" font-size="12" fill="currentColor">scheduled crawl</text>
  <text x="91" y="87" text-anchor="middle" font-size="12" fill="currentColor">+ diff</text>
  <g stroke="var(--accent-teal)" stroke-width="1" opacity="0.6">    <line x1="166" y1="72" x2="300" y2="34"/>
    <line x1="166" y1="72" x2="300" y2="56"/>
    <line x1="166" y1="72" x2="300" y2="78"/>
    <line x1="166" y1="72" x2="300" y2="100"/>
    <line x1="166" y1="72" x2="300" y2="122"/>
    <line x1="166" y1="72" x2="300" y2="144"/>
    <line x1="166" y1="72" x2="300" y2="166"/>
    <line x1="166" y1="72" x2="300" y2="188"/>
    <line x1="166" y1="72" x2="300" y2="210"/>
    <line x1="166" y1="72" x2="300" y2="232"/>
    <line x1="166" y1="72" x2="300" y2="254"/>
    <line x1="166" y1="72" x2="300" y2="276"/>  </g>
  <g fill="currentColor" font-size="11">    <circle cx="308" cy="34" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="56" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="78" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="100" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="122" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="144" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="166" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="188" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="210" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="232" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="254" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>
    <circle cx="308" cy="276" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>  </g>
  <text x="330" y="160" font-size="12" fill="currentColor" opacity="0.7">all 12 properties, one report</text>
  <line x1="16" y1="212" x2="704" y2="212" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <text x="16" y="242" font-size="13" font-weight="600" fill="var(--accent)">JUDGMENT — does not scale</text>
  <rect x="16" y="258" width="150" height="46" rx="8" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="1.4"/>
  <text x="91" y="286" text-anchor="middle" font-size="12" fill="currentColor">your attention</text>
  <g stroke="var(--accent)" stroke-width="1.6">
    <line x1="166" y1="281" x2="300" y2="270"/>
    <line x1="166" y1="281" x2="300" y2="294"/>
  </g>
  <circle cx="308" cy="270" r="5" fill="var(--accent)"/>
  <circle cx="308" cy="294" r="5" fill="var(--accent)"/>
  <text x="330" y="275" font-size="12" fill="currentColor" opacity="0.8">the two that carry the commercial value</text>
  <text x="330" y="299" font-size="12" fill="currentColor" opacity="0.55">the rest get monitoring, not thought</text>
</svg>
<figcaption>Monitoring goes everywhere. Attention does not — and spreading it evenly across twelve sites is the mistake.</figcaption>
</figure>

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
