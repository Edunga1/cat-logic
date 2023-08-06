// replace markdown links to wiki pages with internal links

// e.g. <a href="./javascript.md"> -> <a href="../javascript">
export default function replaceWikiLinks(text: string) {
  const regex = /<a href="\.\/([^"]+)\.md">/g
  return text.replaceAll(
    regex,
    (_, p1) => {
      return `<a href="../${p1}">`
    }
  )
}

export function createWikiLink(slug: string) {
  if (slug.startsWith('/')) return `/wiki${slug}`
  return `/wiki/${slug}`
}
