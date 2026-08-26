---
title: 'Building an LLM content pipeline that publishes to WordPress'
excerpt: 'A generation step is the easy part. The pipeline only became useful once validation, scheduling and resumable state were in front of it.'
date: 2026-08-24
category: 'Automation'
tags: ['LLM', 'Python', 'WordPress', 'SEO', 'Automation']
translationKey: 'llm-content-pipeline-wordpress'
---

I run content on several properties at once. Before any of this existed, each
article meant the same loop by hand: write it, add the SEO metadata, find a slot
in the calendar, publish it, record that it went out. The loop is not hard. It's
just identical every time, and the cost of it scales linearly with the number of
sites.

So I built a pipeline. What I want to write about here is not the generation
step — that part is a few lines against an API — but everything that had to sit
around it before the thing was usable.

## The generation step is the least interesting part

The naive version of this project is a script that takes a keyword and asks a
model for an article. That works, once, in a demo. It fails as a system for a
boring reason: you cannot look at the output of a hundred runs. You need the
pipeline to reject its own bad output without you reading it.

That reframes the problem. The interesting work is not "how do I get an article"
but "how do I know this article is publishable without reading it".

## Stage one: briefs, not prompts

Each site has a config file and a set of keyword briefs. A brief is not a prompt.
It's structured input: the target query, the intent behind it, the required
sections, internal links that should appear, and the entity the piece is about.

Keeping briefs as data rather than as prose has two effects. The obvious one is
that prompts stay consistent across runs. The one I didn't expect: it makes the
content strategy reviewable on its own, separately from the writing. I can look
at fifty briefs and see the gaps in coverage. I cannot do that by reading fifty
articles.

## Stage two: validation is where the value is

This is the part I'd build first if I started again.

Every generated draft goes through checks before it is allowed near the queue:

- **Structural checks.** Does it have the sections the brief asked for? Is there
  exactly one `H1`? Do the headings nest correctly? Is the meta description
  inside its length bounds?
- **De-duplication.** Does this piece substantially overlap something already
  published on the same property? This one matters most. The failure mode of
  generated content at scale is not that any single piece is bad — it's that
  piece forty is a paraphrase of piece twelve, and the site slowly turns into a
  set of near-duplicates competing with each other.
- **Link sanity.** Do the internal links point at pages that exist? Models are
  happy to invent a plausible URL.

A draft that fails goes to a rejected pile with the reason attached. It does not
get silently retried, because a silent retry loop is how you end up burning
tokens on a brief that was malformed to begin with.

## Stage three: pacing is a feature

The scheduler does not publish everything the moment it's ready. It holds a queue
and releases into slots.

There's a practical reason and a strategic one. Practically, a burst of twenty
posts in an hour is a bad signal and an obvious footprint. Strategically, pacing
gives me a window to pull something before it goes live. The queue is the last
place a human can cheaply intervene, so I wanted that window to be real rather
than theoretical.

## Stage four: publishing, and the state that survives a crash

Publishing itself is the WordPress REST API — create the post, attach metadata,
set the status. The part worth engineering is what happens when the run dies
halfway.

Every stage writes its state. A run that fails at article thirty resumes at
thirty, not at one. This sounds obvious written down; it was not obvious to me
until the first time a network error cost a full batch and I had no way to tell
which articles had already been posted. Idempotency and a durable record of what
was actually published are the difference between a script and something you're
willing to leave running.

## One configuration, several sites

All of it runs from a shared configuration. Adding a property means adding a
config block and its briefs — not forking the code. That constraint kept the
pipeline honest: anything site-specific had to become data, which meant the code
stayed small enough to still understand months later.

## What I deliberately did not automate

The pipeline does not decide what to write about. Brief creation is manual,
because choosing the topic is the part where being wrong is expensive and being
right compounds. It's also the part that requires knowing the business, which is
exactly the thing a model doesn't have.

It also doesn't touch anything where a mistake is public and permanent —
redirects, canonical tags, indexing directives. Those are cheap to do by hand and
expensive to get wrong at scale.

I think that line is the actual lesson. Automation pays off on work that is
identical every time and cheap to verify. Applied to work that is judgment-heavy
or expensive to reverse, it just produces mistakes faster.

## What I'd change

The de-duplication check is currently comparing against published pieces on the
same property. It should compare against the queue as well — two similar briefs
generated in the same batch can both pass and then collide after publication.
That's the next thing on the list.

The source is on [GitHub](https://github.com/Takeshhii/ai-wordpress-publisher).
