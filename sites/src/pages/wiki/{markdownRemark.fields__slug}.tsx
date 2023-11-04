import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
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
    tableOfContents,
    html
  } = data.markdownRemark ?? {}
  const docTitle = extractDocTitle(data)
  const relatedLinks = html && extractInternalLinks(html) || []
  const relatedLinksToc = relatedLinks.map(link => (
    <a key={link} href={`../${link}`} style={relatedLinkStyle}>{link}</a>
  ))

  return (
    <Wiki
      title={docTitle}
      tableOfContents={tableOfContents || ""}
      relatedLinksToc={relatedLinksToc}
      wikiContents={removeFirstHeading(html || "")}
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

export function Head(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const docTitle = extractDocTitle(data)
  return (
    <title>Cat Logic{ docTitle && ` - ${docTitle}` }</title>
  )
}

function extractDocTitle(data: Queries.WikiDetailQuery) {
  const { headings } = data.markdownRemark ?? {}
  return headings?.[0]?.value || undefined
}

