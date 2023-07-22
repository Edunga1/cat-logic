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
  display: grid;
  place-items: center;

  a {
    color: ${theme.colors.link};
  }

  @media (${device.larger}) {
    padding: 9rem 1rem 3rem 1rem;
  }
`

export default function IndexPage(
  { data }: PageProps<Queries.WikiListQuery>,
) {
  const { edges } = data.allMarkdownRemark
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

export const Head: HeadFC = () => <title>Cat Logic - Home</title>

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
    }
  }
`
