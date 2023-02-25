import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import WikiList from "../components/molecules/WikiList"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 400,
}

export default function IndexPage(
  { data }: PageProps<Queries.WikiListQuery>,
) {
  const { edges, totalCount } = data.allMarkdownRemark
  const items = edges.map(({ node }) => ({
    id: node.id,
    path: `./wiki/${node.id}`,
    title: node.headings?.at(0)?.value ?? "(Untitled)",
  }))

  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        WORK IN PROGRESS
      </h1>
      <h1>
        {totalCount} Pages
      </h1>
      <WikiList items={items} />
    </main>
  )
}

export const Head: HeadFC = () => <title>Home Page</title>

export const pageQuery = graphql`
  query WikiList {
    allMarkdownRemark {
      edges {
        node {
          id
          headings(depth: h1) {
            value
          }
        }
      }
      totalCount
    }
  }
`
