const visit = require("unist-util-visit")

/**
 * 다른 Markdown 파일에 대한 링크를 상대 경로로 변경
 *
 * `gatsby-transformer-remark`의 플러그인으로써 마크다운 변환 과정에서 처리됨
 * ref. https://stackoverflow.com/q/48553146/6587078
 */
module.exports = function({ markdownAST }) {
  visit(markdownAST, "link", node => {
    if (isRelativeLink(node.url)) {
      node.url = node.url.replace(/.*\/(.+)\.md(#.*)?.*$/, (_, base, hash) => {
        return `../${base}${hash || ""}`
      })
    }
  })

  return markdownAST
}

function isRelativeLink(url) {
  return url && url.match(/.*\/(.+)\.md(#.*)?/)
}
