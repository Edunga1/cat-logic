import * as React from "react"
import { graphql } from "gatsby"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { file } = data
  const { childMarkdownRemark } = file
  const { html, tableOfContents } = childMarkdownRemark
  return (
    <div>
      <h1>{file.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      childMarkdownRemark {
        tableOfContents
        html
      }
    }
  }
`
