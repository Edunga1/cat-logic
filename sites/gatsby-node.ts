import { GatsbyNode, Node } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import getRelatedDocs from "./src/related-docs/RelatedDocs"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    createNodeField({
      name: "slug",
      node,
      value: createFilePath({ node, getNode }),
    })

    createNodeField({
      name: "head",
      node,
      value: getHead(node),
    })

    createNodeField({
      name: "relatedDocs",
      node,
      value: parseRelatedDocs(node),
    })
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions: { createTypes } }) => {
  const typeDefs = `
    type MarkdownRemark implements Node {
      fields: Fields
    }
    type Doc {
      slug: String!
      similarity: Float!
    }
    type Fields {
      relatedDocs: [Doc!]!
    }
  `
  createTypes(typeDefs)
}

// TODO: heading 제외하도록 개선 필요
function getHead(node: Node) {
  const content = node.internal.content ?? ""
  const regex = /^#[^#].*\n*(.+)/gm
  const matched = regex.exec(content)?.at(1) ?? ""
  return matched.replace(/^[#\s]*/, "").trim()
}

function parseRelatedDocs(node: Node) {
  return getRelatedDocs(node.fileAbsolutePath)
    .map(x => ({
      slug: x.path.replace(/.md$/, ""),
      similarity: x.similarity,
    }))
}
