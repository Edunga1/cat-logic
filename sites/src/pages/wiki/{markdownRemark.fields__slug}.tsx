import * as React from "react"
import { graphql, PageProps } from "gatsby"
import replaceWikiLinks from "../../utils/wiki"
import extractInternalLinks from "../../utils/internal-links"
import Wiki from "../../components/templates/Wiki"

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
    <Wiki
      tableOfContents={tableOfContents || ""}
      relatedLinksToc={relatedLinksToc}
      wikiContents={rhtml || ""}
    />
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
