import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Wiki from "../../components/templates/Wiki"
import { removeFirstHeading } from "../../utils/html-string"
import Link from "../atoms/Link"

export default function BlogPostTemplate(
  { data }: PageProps<Queries.WikiDetailQuery>,
) {
  const {
    tableOfContents,
    html,
    fields,
  } = data.file?.childMarkdownRemark ?? {}
  const commitLogs = data.file?.fields?.gitLogs || []
  const logDates = extractLogDates(data)
  const { hash: gitLogLatestHash, date: gitLogLatestDate } = commitLogs[0] || {}
  const docTitle = extractDocTitle(data)
  const relatedDocs = extractRelatedDocs(data)
  const relatedLinks = relatedDocs.map(doc => {
    const link = doc.slug
    return <Link key={link} href={`../${link}`}>{link}</Link>
  })
  const gitHubRepositoryUrl = data.site?.siteMetadata?.gitHubRepositoryUrl || undefined

  return (
    <Wiki
      title={docTitle}
      tableOfContents={tableOfContents || ""}
      relatedLinks={relatedLinks}
      wikiContents={removeFirstHeading(html || "")}
      slug={fields?.slug || ""}
      lastModified={gitLogLatestDate ? new Date(gitLogLatestDate) : undefined}
      lastCommitHash={gitLogLatestHash || undefined}
      gitHubRepositoryUrl={gitHubRepositoryUrl}
      activityDates={logDates}
    />
  )
}

export const pageQuery = graphql`
  query WikiDetail($id: String!) {
    file(childMarkdownRemark: {id: {eq: $id}}) {
      fields {
        gitLogs {
          hash
          date
        }
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
    site {
      siteMetadata {
        gitHubRepositoryUrl
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

function extractLogDates(data: Queries.WikiDetailQuery) {
  const logs = data.file?.fields?.gitLogs || []
  return logs
    .map(x => x && x.date && new Date(x.date) || null)
    .filter(x => x !== null)
    .map(x => x as Date)
}
