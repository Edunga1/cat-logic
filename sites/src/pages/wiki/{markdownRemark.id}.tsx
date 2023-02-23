import * as React from "react"
import { graphql } from "gatsby"

export default function BlogPostTemplate(
  { data }: Props,
) {
  const { tableOfContents, html } = data.markdownRemark
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
      tableOfContents
      html
    }
  }
`

interface Props {
  data: {
    markdownRemark: {
      tableOfContents: string
      html: string
    }
  }
}
