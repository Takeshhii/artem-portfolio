import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Writing lives as Markdown/MDX in src/content/writing/<lang>/.
 * The folder sets the language; `translationKey` pairs the two versions of the
 * same piece so each page can point at its counterpart with hreflang.
 *
 * Adding an article = adding one file per language; nothing else changes.
 * Set `draft: true` to keep a piece out of the built site.
 */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      'AI',
      'Automation',
      'Growth',
      'SEO',
      'Product',
      'Engineering',
      'Experiments',
      'Building in public',
    ]),
    tags: z.array(z.string()).default([]),
    /** Shared across the EN and RU versions of the same article. */
    translationKey: z.string(),
    /** Optional social preview; falls back to the site default. */
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
