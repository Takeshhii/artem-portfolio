---
title: 'Building an AI career platform: what matching actually has to solve'
excerpt: 'The hard part of job matching is not similarity scoring. It is that the two sides describe the same job in different vocabularies, and one side is guessing.'
date: 2026-08-24
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
