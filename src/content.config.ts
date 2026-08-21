import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Writing lives as Markdown/MDX in src/content/writing/.
 * Adding an article = adding one file; nothing else needs to change.
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
      'Experiments',
      'Building in public',
    ]),
    tags: z.array(z.string()).default([]),
    /** Optional social preview; falls back to the site default. */
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
