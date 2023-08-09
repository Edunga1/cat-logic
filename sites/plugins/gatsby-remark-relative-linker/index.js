const visit = require("unist-util-visit")

module.exports = function({ markdownAST }) {
  visit(markdownAST, "link", node => {
    if (isRelativeLink(node.url)) {
      const old = node.url
      node.url = node.url.replace(/.*\/(.+)\.md(#.*)?$/, (_, base, hash) => {
        return `../${base}${hash || ""}`
      })
    }
  })

  return markdownAST
}

function isRelativeLink(url) {
  return url && url.startsWith("/") && url.endsWith(".md")
}
