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
  const { nodes } = data.allFile
  const items = nodes.map(({ childMarkdownRemark }, i) => ({
    id: i.toString(),
    path: `./wiki${childMarkdownRemark?.fields?.slug}`,
    title: childMarkdownRemark?.headings?.at(0)?.value ?? "(Untitled)",
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
    allFile(
      filter: {childMarkdownRemark: {id: {ne: null}}},
      sort: {mtime: DESC}
    ) {
      nodes {
        name
        mtime
        absolutePath
        childMarkdownRemark {
          headings(depth: h1) {
            value
          }
          fields {
            slug
          }
          html
        }
      }
    }
  }
`
