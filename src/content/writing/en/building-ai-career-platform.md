---
title: 'Building an AI career platform: what matching actually has to solve'
excerpt: 'The hard part of job matching is not similarity scoring. It is that the two sides describe the same job in different vocabularies, and one side is guessing.'
date: 2025-12-01
category: 'Product'
tags: ['AI', 'Product', 'LLM', 'Next.js']
translationKey: 'building-ai-career-platform'
---

AIRA is a career platform for students: job discovery, matching, application
workflows and career assistance in one place. I'm building it because students
are the group with the least leverage in hiring and the least time to spend on
it — the search is a repetitive manual process at exactly the point in life when
nobody has spare hours.

This is a note on the parts that turned out to be harder than expected, written
while it's still in progress rather than afterwards.

<figure class="diagram-figure">
<svg class="diagram" viewBox="0 0 720 300" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Two vocabularies normalised onto shared claims before matching</title>
  <rect x="16" y="46" width="188" height="80" rx="9" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
  <text x="110" y="70" text-anchor="middle" font-size="12.5" font-weight="600" fill="currentColor">student CV</text>
  <text x="110" y="92" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">"REST API for a</text>
  <text x="110" y="109" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">course project"</text>
  <rect x="16" y="176" width="188" height="80" rx="9" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
  <text x="110" y="200" text-anchor="middle" font-size="12.5" font-weight="600" fill="currentColor">vacancy</text>
  <text x="110" y="222" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">"experience with backend</text>
  <text x="110" y="239" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">service development"</text>
  <path d="M204 86 L268 130" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <path d="M204 216 L268 172" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <rect x="268" y="120" width="164" height="62" rx="9" fill="var(--accent)" fill-opacity="0.11" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="350" y="146" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--accent)">extract claims</text>
  <text x="350" y="166" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.75">what · with what · how deep</text>
  <line x1="432" y1="151" x2="486" y2="151" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <rect x="486" y="120" width="218" height="62" rx="9" fill="var(--accent-teal)" fill-opacity="0.13" stroke="var(--accent-teal)" stroke-width="1.5"/>
  <text x="595" y="146" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--accent-teal)">match on the claims</text>
  <text x="595" y="166" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.75">not on the wording</text>
  <text x="360" y="278" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.65">Same evidence, two dialects. Vector similarity alone reads them as barely related.</text>
</svg>
<figcaption>Normalise both sides onto shared claims first. Matching the wording directly is what makes a demo instead of a product.</figcaption>
</figure>

## Matching is a vocabulary problem before it's a ranking problem

The naive framing is a similarity score: embed the CV, embed the vacancy, rank by
distance. That produces something demoable in an afternoon and mediocre in
practice.

The reason is that the two documents aren't two descriptions of the same thing.

A vacancy is written by a company that already knows what it wants and describes
it in internal language — team names, stack conventions, seniority labels that
mean different things at different companies. A student CV is written by someone
guessing what the market wants, describing coursework and projects in academic
vocabulary.

The gap isn't noise you can embed your way past. "Built a REST API for a course
project" and "experience with backend service development" are the same evidence
in two dialects, and vector similarity alone treats them as weakly related.

What helps is normalising both sides onto a shared intermediate representation —
extract the underlying claims (what was built, what was used, at what depth) from
both documents, then match on those. It's more work than cosine distance and it's
the difference between a demo and something useful.

## The cold-start problem is worse for students

Recommendation systems normally bootstrap from behaviour. Students don't have
any: no application history, often no work history, and the first session is
exactly when the product has to be useful or they leave.

So the first-run experience can't depend on data you don't have. It has to
extract enough signal from a single CV upload plus a small number of explicit
questions — and the questions have to be ones a student can actually answer.

That last constraint matters more than it sounds. "What's your target
compensation band?" is a reasonable filter and an unanswerable question for
someone who has never been paid for this work. Asking it produces either a blank
or a guess, and a guess is worse than a blank because it silently narrows
everything downstream.

## Where the LLM belongs, and where it doesn't

The pattern I keep arriving at — here and in
[the content pipeline I built](/writing/llm-content-pipeline-wordpress) — is that
models are good at normalisation and bad at being the system of record.

**Good uses:** extracting structured claims from unstructured CVs; rewriting a
vacancy's requirements into comparable terms; explaining *why* a given match was
suggested, which turns out to matter a lot for trust.

**Bad uses:** anything where the output needs to be stable across runs. If the
same CV produces a different skill set on Tuesday, every downstream feature
inherits that instability. Extraction results get persisted and versioned, not
regenerated on read.

The explanation piece deserves emphasis. A ranked list without reasons is
something users argue with silently and then stop trusting. A match that says
which specific experience it keyed on is one they can correct — and the
correction is the most valuable signal in the product.

## Application workflows are where the actual time goes

The interesting realisation was that discovery isn't the bottleneck. Finding
plausible vacancies is comparatively easy. The time sink is everything after:
tailoring an application per posting, tracking what was sent where, following up.

That's unglamorous state management rather than AI, and it's a bigger share of
the user's actual pain. It's also the part where a product can be reliably good
without needing a model to be clever.

I think that's the general shape of it: the AI earns its place in normalisation
and explanation, and the product earns its place in removing repetitive process.
Getting those the wrong way round produces something that demos well and doesn't
retain.

## Status

Live and in active development, with a lot still unresolved — particularly the
extraction stability problem above. AIRA is part of the Business Incubator
programme at the Financial University, where I'm studying Business Informatics.

You can see it at [student-aira.com](https://student-aira.com).
