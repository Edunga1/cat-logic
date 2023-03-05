import * as React from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"
import replaceWikiLinks from "../../utils/wiki"

const ContainerStyles = {
  display: "grid",
  justifyItems: "center",
}

const ContentStyles = {
  display: "grid",
  gridTemplateColumns: "minmax(300px, 1fr) minmax(400px, 1000px)",
  width: "fit-content",
}

const Toc = styled.div`
  margin: 4rem 2rem 0 0;
  & ul {
    list-style: none;
    & p {
      margin: 0;
    }
  }
`

export default function BlogPostTemplate(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const { tableOfContents, html } = data.markdownRemark ?? {}
  const rhtml = html && replaceWikiLinks(html)
  return (
    <div style={ContainerStyles}>
      <div style={ContentStyles}>
        {tableOfContents && <Toc dangerouslySetInnerHTML={{ __html: tableOfContents }} />}
        {rhtml && <div dangerouslySetInnerHTML={{ __html: rhtml }} />}
      </div>
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
