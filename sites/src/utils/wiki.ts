const WIKI_PATH = "wiki"

export function createWikiLink(slug: string) {
  return new URL(slug.replace(/^\//, ""), `${location.origin}/${WIKI_PATH}/`).href
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
