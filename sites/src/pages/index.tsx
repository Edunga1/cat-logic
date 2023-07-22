import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import WikiList from "../components/molecules/WikiList"
import styled from "styled-components"
import theme from "../constants/theme"
import device from "../constants/device"
import "./global.css"

const StyledMain = styled.main`
  background-color: ${theme.colors.background};
  color: ${theme.colors.foreground};
  overflow: hidden;

  h1 {
    margin-top: 0;
    margin-bottom: 64;
    max-width: 400;
  }

  a {
    color: ${theme.colors.link};
  }

  @media (${device.larger}) {
    padding: 9rem;
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
