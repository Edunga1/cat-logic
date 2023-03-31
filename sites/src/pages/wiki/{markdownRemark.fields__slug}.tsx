import * as React from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"
import replaceWikiLinks from "../../utils/wiki"
import Toc from "../../components/molecules/Toc"

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(400px, 1000px);
  width: fit-content;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    & > div:nth-child(1) {
      display: none;
    }
  }
`

const Content = styled.div`
  & a {
    text-decoration: none;
  }
`

export default function BlogPostTemplate(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const { tableOfContents, html } = data.markdownRemark ?? {}
  const rhtml = html && replaceWikiLinks(html)
  return (
    <Container>
      {tableOfContents && <Toc contents={tableOfContents} />}
      {rhtml && <Content dangerouslySetInnerHTML={{ __html: rhtml }} />}
    </Container>
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
