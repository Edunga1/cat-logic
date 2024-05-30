import * as React from "react"
import { graphql, PageProps } from "gatsby"
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
    html,
    fields,
  } = data.file?.childMarkdownRemark ?? {}
  const {
    gitLogLatestHash,
    gitLogLatestDate,
  } = data.file?.fields ?? {}
  const docTitle = extractDocTitle(data)
  const relatedDocs = extractRelatedDocs(data)
  const relatedLinksToc = relatedDocs.map(doc => {
    const link = doc.slug
    return <a key={link} href={`../${link}`} style={relatedLinkStyle}>{link}</a>
  })

  return (
    <Wiki
      title={docTitle}
      tableOfContents={tableOfContents || ""}
      relatedLinksToc={relatedLinksToc}
      wikiContents={removeFirstHeading(html || "")}
      slug={fields?.slug || ""}
      lastModified={gitLogLatestDate ? new Date(gitLogLatestDate) : undefined}
      lastCommitHash={gitLogLatestHash || undefined}
    />
  )
}

export const pageQuery = graphql`
  query WikiDetail($id: String!) {
    file(childMarkdownRemark: {id: {eq: $id}}) {
      fields {
        gitLogLatestHash
        gitLogLatestDate
      }
      childMarkdownRemark {
        headings(depth: h1) {
          value
        }
        fields {
          slug
          relatedDocs {
            slug
            similarity
          }
        }
        tableOfContents
        html
      }
    }
  }
`

export function Head(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const docTitle = extractDocTitle(data)
  return (
    <title>Cat Logic{docTitle && ` - ${docTitle}`}</title>
  )
}

function extractDocTitle(data: Queries.WikiDetailQuery) {
  const { headings } = data.file?.childMarkdownRemark ?? {}
  return headings?.[0]?.value || undefined
}

function extractRelatedDocs(data: Queries.WikiDetailQuery) {
  const relatedDocs = data.file?.childMarkdownRemark?.fields?.relatedDocs || []
  return relatedDocs
    .filter(x => x.similarity < 1)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
}
