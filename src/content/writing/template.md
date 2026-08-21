---
title: 'Article template — copy this file to start a new piece'
excerpt: 'Not published. Duplicate this file, change the frontmatter and set draft to false when the piece is ready.'
date: 2026-01-01
category: 'Automation'
tags: ['template']
draft: true
---

This file is a template. It never appears on the site because `draft: true` is set
in the frontmatter above.

## How to publish an article

1. Copy this file to `src/content/writing/your-article-slug.md`. The filename
   becomes the URL: `/writing/your-article-slug`.
2. Fill in the frontmatter:
   - `title` — the headline.
   - `excerpt` — one or two sentences. Used on the index page, in the social
     preview and as the meta description.
   - `date` — publication date, `YYYY-MM-DD`.
   - `category` — one of: AI, Automation, Growth, SEO, Product, Experiments,
     Building in public.
   - `tags` — a list, shown at the end of the article.
   - `ogImage` — optional, e.g. `/images/your-image.png`. Falls back to the site
     default.
3. Write the body in Markdown below the frontmatter.
4. Set `draft: false` (or remove the line).
5. Run `npm run build` and deploy.

## Formatting available

Regular paragraphs, **bold**, `inline code`, and links all work as expected.

### Subheadings

Use `##` for section headings and `###` for subsections. Lists:

- Bullet points
- Are styled to match the rest of the site

> Blockquotes are available for pull quotes.

```python
# Fenced code blocks render on a dark background
print("hello")
```

Images go in `public/images/` and are referenced as `![Alt text](/images/file.png)`.
Always write meaningful alt text — it matters for both accessibility and search.
