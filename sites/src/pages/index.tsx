import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import WikiList from "../components/molecules/WikiList"
import styled from "styled-components"
import theme from "../theme"

const StyledMain = styled.main`
  padding: 9rem;
  background-color: ${theme.colors.background};
  color: ${theme.colors.foreground};

  h1 {
    margin-top: 0;
    margin-bottom: 64;
    max-width: 400;
  }

  a {
    color: ${theme.colors.link};
  }
`

export default function IndexPage(
  { data }: PageProps<Queries.WikiListQuery>,
) {
  const { edges, totalCount } = data.allMarkdownRemark
  const items = edges.map(({ node }, i) => ({
    id: i.toString(),
    path: `./wiki${node.fields?.slug}`,
    title: node.headings?.at(0)?.value ?? "(Untitled)",
  }))

  return (
    <StyledMain>
      <h1>WORK IN PROGRESS</h1>
      <h2>{totalCount} Pages</h2>
      <WikiList items={items} />
    </StyledMain>
  )
}

export const Head: HeadFC = () => <title>Home Page</title>

export const pageQuery = graphql`
  query WikiList {
    allMarkdownRemark {
      edges {
        node {
          headings(depth: h1) {
            value
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
