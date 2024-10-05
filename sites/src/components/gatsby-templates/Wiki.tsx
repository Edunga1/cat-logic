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
  // TODO: "추론 애플리케이션" 문서에서 에러가 있음
  const relatedLinks = relatedDocs.map(doc => {
    return <Link key={doc.slug} href={`../${doc.slug}`}>{doc.title}</Link>
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
    allMarkdownRemark {
      nodes {
        headings(depth: h1) {
          value
        }
        fields {
          slug
        }
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

function extractRelatedDocs(data: Queries.WikiDetailQuery): {
  slug: string,
  title: string,
  similarity: number,
}[] {
  const relatedDocs = data.file?.childMarkdownRemark?.fields?.relatedDocs || []
  const mostSimilarDocs = relatedDocs
    .filter(x => x.similarity < 1)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
  return mostSimilarDocs.map(x => ({
    slug: x.slug,
    title: getDocTitle(x.slug, data),
    similarity: x.similarity,
  }))
}

function extractLogDates(data: Queries.WikiDetailQuery) {
  const logs = data.file?.fields?.gitLogs || []
  return logs
    .map(x => x && x.date && new Date(x.date) || null)
    .filter(x => x !== null)
    .map(x => x as Date)
}

function getDocTitle(slug: string, data: Queries.WikiDetailQuery) {
  const doc = data.allMarkdownRemark?.nodes.find(x => x.fields?.slug === `/${slug}/`)
  return doc?.headings?.[0]?.value || "?"
}
