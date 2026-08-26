---
title: 'B2B email in a tool built for B2C: segmenting Klaviyo when the buyer is a company'
excerpt: 'Klaviyo assumes a consumer with a cart. B2B buying is a slow, multi-person process with no purchase event to react to — which changes what a segment should be built from.'
date: 2026-02-01
category: 'Automation'
tags: ['Klaviyo', 'Email', 'B2B', 'Marketing Automation']
translationKey: 'klaviyo-b2b-segmentation'
---

Klaviyo is built around an e-commerce assumption: a person browses, adds to cart,
buys or doesn't, and the platform reacts to those events. That model is excellent
when it fits.

It fits B2B badly. Working on email for a US custom-branded bottled water
business — where the customer is a company ordering branded product, not a
consumer buying a bottle — most of the default machinery doesn't apply, and the
question becomes what to replace it with.

<figure class="diagram-figure">
<svg class="diagram" viewBox="0 0 720 300" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>One profile with a purchase event, versus one account with several people and none</title>
  <text x="16" y="28" font-size="13" font-weight="600" fill="currentColor" opacity="0.75">WHAT THE TOOL ASSUMES</text>
  <circle cx="70" cy="82" r="18" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <text x="70" y="122" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.75">one person</text>
  <line x1="96" y1="82" x2="150" y2="82" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
  <rect x="150" y="62" width="112" height="40" rx="7" fill="var(--accent-teal)" fill-opacity="0.14" stroke="var(--accent-teal)" stroke-width="1.3"/>
  <text x="206" y="87" text-anchor="middle" font-size="12" fill="currentColor">purchase event</text>
  <line x1="262" y1="82" x2="312" y2="82" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
  <text x="322" y="87" font-size="12" fill="currentColor" opacity="0.75">flow fires</text>
  <line x1="16" y1="150" x2="704" y2="150" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <text x="16" y="182" font-size="13" font-weight="600" fill="var(--accent)">WHAT B2B ACTUALLY IS</text>
  <rect x="16" y="198" width="196" height="86" rx="9" fill="var(--accent)" fill-opacity="0.09" stroke="var(--accent)" stroke-width="1.4"/>
  <text x="114" y="220" text-anchor="middle" font-size="12" fill="var(--accent)" font-weight="600">one account</text>
  <circle cx="58" cy="252" r="13" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.65"/>
  <circle cx="114" cy="252" r="13" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.65"/>
  <circle cx="170" cy="252" r="13" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.65"/>
  <text x="114" y="278" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.6">requests · approves · signs</text>
  <line x1="212" y1="241" x2="266" y2="241" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
  <rect x="266" y="220" width="130" height="42" rx="7" fill="none" stroke="var(--accent-rose)" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="331" y="246" text-anchor="middle" font-size="12" fill="var(--accent-rose)">often no event</text>
  <text x="418" y="232" font-size="12" fill="currentColor" opacity="0.75">so segment on what they</text>
  <text x="418" y="252" font-size="12" fill="currentColor" opacity="0.75">state: use case, size, stage,</text>
  <text x="418" y="272" font-size="12" fill="currentColor" opacity="0.75">whether artwork exists yet</text>
</svg>
<figcaption>The unit of the tool is a person with a purchase. The unit of the business is an account with several people and no event.</figcaption>
</figure>

## Why the default model doesn't transfer

Three differences do most of the damage.

**There is often no purchase event.** A B2B order can start as a form fill and
finish as an invoice negotiated over email. The transaction that a B2C flow would
trigger on may never exist as a tracked event.

**The buyer is several people.** A person who requests a quote, the person who
approves the budget and the person who signs may be three different contacts at
one company. Klaviyo's unit is the profile — an individual. Your actual unit is
the account.

**The cycle is long and lumpy.** Consumer re-engagement logic assumes something
like a purchase rhythm. A company that orders twice a year isn't lapsed at ninety
days — it's exactly on schedule. Applying a consumer-style dormancy window to
that will suppress people who are behaving normally.

## Segment on stated intent, not inferred behaviour

Without reliable purchase events, behavioural segmentation gets thin. What
remains is what people tell you directly — and in B2B, they tell you a lot,
because the qualifying information is what they have to provide anyway.

The fields that turned out to carry real signal:

- **What they're buying for** — an event, retail resale, ongoing corporate
  supply. These are genuinely different buyers with different objections.
- **Order size band.** A hundred bottles for one event and a recurring pallet
  order are not the same conversation.
- **Where they are in the process.** Enquiry, artwork stage, quoted, ordered.
- **Whether artwork exists yet.** For a custom-branded product this is the real
  blocker in the middle of the funnel, and it splits the list cleanly.

None of that is inferred from clicks. It comes from forms, replies and manual
tagging — which means the segmentation is only as good as the discipline of
capturing it.

## Structure campaigns around the blocker, not the calendar

The useful reframing was to stop thinking in campaigns-per-month and start
thinking about what is stopping each segment from moving to the next stage.

For this business, the stages had distinct blockers:

- Early enquiry: uncertainty about minimums and lead time.
- Artwork stage: nobody has produced the file yet. This is where most of the
  stalling happens.
- Quoted: internal approval, which you cannot influence directly but can make
  easier by giving your contact something forwardable.

That last point changed how I wrote. In B2C you write to the reader. In B2B you
frequently write for someone who has to forward your email to a person you'll
never talk to — so the email needs to survive being read out of context by
someone with less patience and more authority.

Practically that means: the offer legible without scrollback, no dependence on a
previous email, and specifics — price bands, lead times, minimums — in the body
rather than behind a link.

## What I would set up first

If I were starting this again on a B2B list in Klaviyo:

1. **Decide the account-level fields before sending anything.** Use case, size
   band, stage, artwork status. Retrofitting these onto an existing list is
   tedious and always incomplete.
2. **Don't inherit consumer dormancy windows.** Set re-engagement timing from the
   actual reorder cycle, or you'll quietly stop mailing your normal customers.
3. **Build the artwork-stage sequence first.** It was the highest-leverage
   segment because it's where deals stall for a reason you can actually address.
4. **Write every campaign assuming it will be forwarded.**

The general lesson, which isn't specific to Klaviyo: when a tool's model doesn't
match your business, the mistake is using its defaults anyway. The segments have
to come from how buying actually happens, and then you make the tool express
them — not the other way round.
