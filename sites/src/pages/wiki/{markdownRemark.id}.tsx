import * as React from "react"
import { graphql } from "gatsby"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { id, tableOfContents, html } = data.markdownRemark
  console.log(data)
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      tableOfContents
      html
    }
  }
`
