import * as React from "react"
import { graphql, PageProps } from "gatsby"

export default function BlogPostTemplate(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const { tableOfContents, html } = data.markdownRemark ?? {}
  return (
    <div>
      {tableOfContents && <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  )
}

export const pageQuery = graphql`
  query WikiDetail($id: String!) {
    markdownRemark(id: { eq: $id }) {
      tableOfContents
      html
    }
  }
`
