import * as React from "react"
import { graphql, PageProps } from "gatsby"
import replaceWikiLinks from "../../utils/wiki"
import extractInternalLinks from "../../utils/internal-links"
import Wiki from "../../components/templates/Wiki"
import { removeFirstHeading } from "../../utils/html-string"

const relatedLinkStyle = {
  fontSize: "0.5em",
  marginRight: "0.5em",
}

export default function BlogPostTemplate(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const {
    headings,
    tableOfContents,
    html
  } = data.markdownRemark ?? {}
  const rhtml = html && replaceWikiLinks(html)
  const relatedLinks = html && extractInternalLinks(html) || []
  const relatedLinksToc = relatedLinks.map(link => (
    <a key={link} href={`../${link}`} style={relatedLinkStyle}>{link}</a>
  ))

  return (
    <Wiki
      title={headings?.[0]?.value || undefined}
      tableOfContents={tableOfContents || ""}
      relatedLinksToc={relatedLinksToc}
      wikiContents={removeFirstHeading(rhtml || "")}
    />
  )
}

export const pageQuery = graphql`
  query WikiDetail($id: String!) {
    markdownRemark(id: { eq: $id }) {
      headings(depth: h1) {
        value
      }
      tableOfContents
      html
    }
  }
`
