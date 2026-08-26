---
title: 'Shopify SEO: the duplication problems that are built into the platform'
excerpt: 'Shopify will happily serve the same product at several URLs and split a collection across paginated pages that all look identical. Neither is a bug, and both need a decision.'
date: 2026-08-24
category: 'SEO'
tags: ['Shopify', 'Technical SEO', 'E-commerce', 'Growth']
translationKey: 'shopify-seo-architecture'
---

Shopify is a good platform to sell on and an opinionated one to do search work
on. Most of the friction comes from a small number of structural decisions that
are baked in, produce duplication by default, and cannot be configured away.

Working on organic search for a jewellery store built on Shopify, these are the
ones that actually mattered.

## One product, several URLs

The canonical example. A product is reachable at both:

```
/products/product-handle
/collections/collection-handle/products/product-handle
```

If a product sits in five collections, that's six URLs serving one product.
Shopify sets `rel=canonical` to the `/products/` form by default, which handles
the indexing question — but not the rest of it.

What canonicalisation doesn't fix is **internal linking**. Collection templates
link to the long form by default, so your own site is largely pointing at URLs
that are canonicalised away. The links still pass through the canonical, but you
have made every internal path one hop longer than it needs to be, and your
analytics now splits one product across several page paths.

The fix is a template change: link to `/products/` directly from collection
cards. It's a small edit that makes internal linking, reporting and crawl paths
all agree with each other.

## Collection pagination looks like duplication

Paginated collection pages (`?page=2`, `?page=3`) carry the same title, the same
meta description and the same intro copy as page one. Only the product grid
changes.

The instinct is to `noindex` them. I'd be careful with that — those pages are how
crawlers reach products deep in a large collection. Removing them from the index
also removes a discovery path.

What actually helps:

- Make sure pagination is real links, not JavaScript-only. If a crawler can't
  follow it, deep products are effectively orphaned.
- Differentiate the title on paginated pages so they aren't literal duplicates.
- Keep the intro copy on page one only.

The goal isn't to hide them. It's to make them structurally distinct while
keeping them useful as crawl paths.

## Faceted filtering multiplies pages quietly

Filters generate parameterised URLs. Colour, material, price band, sort order —
each combination is a distinct URL serving a subset of the same products.

This is the failure I'd watch for hardest, because it grows silently. A store
with 200 products and a handful of filters can generate thousands of crawlable
combinations, all thin variations of the same collection.

The rule I'd apply: **a filtered URL has to earn indexation.** Default to
non-indexable, and make exceptions only where a filter matches genuine search
demand — a "gold necklaces" filter probably deserves a real, indexable page,
whereas "sort by price descending" never does.

That inversion — non-indexable by default, indexable by exception — is the same
principle I applied when
[rebuilding a WordPress catalogue theme](/writing/wordpress-theme-technical-seo).
The platform differs; the failure mode is identical.

## Collections are the layer worth thinking about

Products are relatively easy — one product, one page, structured data from real
fields.

Collections are where the actual architecture decisions live, because they're the
pages that can match how people search. Someone searching for a category is
looking for a collection page, not a product. That means collections need to be
built around demand rather than around internal merchandising convenience.

The two things that mattered most:

1. **A collection should correspond to something people search for.** If it
   exists only because it was convenient to group those items in admin, it's an
   internal tool, not a landing page.
2. **A collection page needs content that isn't the product grid.** Otherwise
   two collections sharing overlapping products are near-identical documents
   competing for related queries.

## What I'd check first on any Shopify store

In order:

1. Do collection cards link to `/products/` or the long form?
2. Are filter URLs indexable? (They usually are, by accident.)
3. Is pagination crawlable as real links?
4. Do collection pages have anything on them besides the grid?
5. Does each collection map to real search demand, or to admin convenience?

None of these are advanced. All of them are structural, which means fixing them
once fixes them for every product you add afterwards.
