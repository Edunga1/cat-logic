const WIKI_PATH = "wiki"

/**
 * Create a link to a wiki page.
 *
 * This could be called during server-side rendering.
 */
export function createWikiLink(slug: string) {
  if (slug.startsWith('/')) return `/${WIKI_PATH}${slug}`
  return `/wiki/${slug}`
}

/**
 * Create a link to the index page.
 *
 * e.g. example.com/wiki/slug -> example.com
 * e.g. examplle.com/hosting-service/wiki/slug -> example.com/hosting-service
 */
export function createWikiIndexPath(slug: string) {
  const url = new URL(location.href)
  return url.pathname.replace(`${WIKI_PATH}${slug}`, "")
}
