// e.g. <a href="/s9dg781hasd/javascript.md"> -> [javascript]
export default function extractInternalLinks(markdown: string): string[] {
  const regex = /<a href="\/([^"]+)">/g
  const links = []
  let match
  while ((match = regex.exec(markdown))) {
    const link = match[1]
    if (link.endsWith(".md")) {
      links.push(link.substring(link.lastIndexOf("/") + 1, link.length - 3))
    }
  }
  return links
}
