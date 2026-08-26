import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LANG, LANGS, path, type Lang } from '../i18n';

export type Post = CollectionEntry<'writing'>;

/** Entry ids look like `en/some-slug` — the folder carries the language. */
export function langOf(post: Post): Lang {
  const first = post.id.split('/')[0];
  return (LANGS as string[]).includes(first) ? (first as Lang) : DEFAULT_LANG;
}

/** The URL slug, with the language folder stripped off. */
export function slugOf(post: Post): string {
  const parts = post.id.split('/');
  return (LANGS as string[]).includes(parts[0]) ? parts.slice(1).join('/') : post.id;
}

/** Root-relative URL for a post. */
export function urlOf(post: Post): string {
  return path(`/writing/${slugOf(post)}`, langOf(post));
}

/** Published posts for one language, newest first. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('writing', ({ data }) => !data.draft);
  return all
    .filter((p) => langOf(p) === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * hreflang map for a post: every language that has a version of the same
 * piece, keyed by `translationKey`.
 */
export async function alternatesFor(post: Post): Promise<Partial<Record<Lang, string>>> {
  const all = await getCollection('writing', ({ data }) => !data.draft);
  const siblings = all.filter((p) => p.data.translationKey === post.data.translationKey);
  const out: Partial<Record<Lang, string>> = {};
  for (const s of siblings) out[langOf(s)] = urlOf(s);
  return out;
}
