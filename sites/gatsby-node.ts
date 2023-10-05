import { GatsbyNode, Node } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
    const head = getHead(node)
    createNodeField({
      name: "head",
      node,
      value: head,
    })
  }
}


// TODO: heading 제외하도록 개선 필요
function getHead(node: Node) {
  const content = node.internal.content ?? ""
  const regex = /^#[^#].*\n*(.+)/gm
  const matched = regex.exec(content)?.at(1) ?? ""
  return matched.replace(/^[#\s]*/, "").trim()
}

