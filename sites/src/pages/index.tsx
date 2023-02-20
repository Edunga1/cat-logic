import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"

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

const IndexPage: React.FC<PageProps> = ({
  data,
}) => {
  const { edges } = data.allMarkdownRemark

  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        WORK IN PROGRESS
      </h1>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <a href={`/wiki/${node.id}`}>
              {node.headings[0]?.value ?? '(Untitled)'}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          headings(depth: h1) {
            value
          }
        }
      }
    }
  }
`
