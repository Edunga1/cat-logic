import * as React from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"
import replaceWikiLinks from "../../utils/wiki"
import Toc from "../../components/molecules/Toc"
import WikiContent from "../../components/molecules/WikiContent"
import extractInternalLinks from "../../utils/internal-links"

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

const relatedLinkStyle = {
  fontSize: "0.5em",
  marginRight: "0.5em",
}

export default function BlogPostTemplate(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const { tableOfContents, html } = data.markdownRemark ?? {}
  const rhtml = html && replaceWikiLinks(html)
  const relatedLinks = html && extractInternalLinks(html) || []
  const relatedLinksToc = relatedLinks.map(link => (
    <a key={link} href={`../${link}`} style={relatedLinkStyle}>{link}</a>
  ))

  return (
    <Container>
      <div>
        {tableOfContents && <Toc contents={tableOfContents} />}
        {relatedLinksToc}
      </div>
      {rhtml && <WikiContent contents={rhtml} />}
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
