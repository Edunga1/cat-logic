import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import WikiList from "../components/molecules/WikiList"
import styled from "styled-components"
import theme from "../constants/theme"
import device from "../constants/device"
import "./global.css"
import { createWikiLink } from "../utils/wiki"
import { useGatsbyPluginFusejs } from "react-use-fusejs"
import SearchBox from "../components/molecules/SearchBox"

const StyledMain = styled.main`
  padding-top: 10%;
  background-color: ${theme.colors.background};
  color: ${theme.colors.foreground};
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-items: center;

  a {
    color: ${theme.colors.link};
  }

  @media (${device.larger}) {
    padding: 9rem 1rem 3rem 1rem;
  }
`

const MainContainer = styled.div`
  display: grid;
  place-items: flex-end;
`

const AltContainer = styled.span`
  font-size: 0.8rem;
  color: ${theme.fonts.body};
`

type WikiItem = {
    id: string;
    path: string;
    title: string;
}

interface SearchResult {
  item: { name: string; title: string }
  refIndex: number
}

function mapSearchResultToWikiItem(result: SearchResult[]): WikiItem[] {
  return result
    .map((it, i) => ({
      id: i.toString(),
      path: createWikiLink(it.item.name),
      title: it.item.title ?? "(Untitled)",
    }))
}

export default function IndexPage(
  { data }: PageProps<Queries.IndexPageQuery>,
) {
  const { nodes } = data.allFile
  const allItems = nodes.map(({ childMarkdownRemark }, i) => ({
    id: i.toString(),
    path: createWikiLink(childMarkdownRemark?.fields?.slug ?? ""),
    title: childMarkdownRemark?.headings?.at(0)?.value ?? "(Untitled)",
  }))
  const [items, setItems] = React.useState(allItems)
  const [query, setQuery] = React.useState("")
  const result = useGatsbyPluginFusejs(query, data.fusejs)

  React.useEffect(() => {
    if (query) {
      setItems(mapSearchResultToWikiItem(result))
    } else {
      setItems(allItems)
    }
  }, [query])

  return (
    <StyledMain>
      <div />
      <MainContainer>
        <SearchBox onChange={setQuery} holder="I guess..." />
        <AltContainer>{items.length} docs</AltContainer>
        <WikiList items={items} fallback="No results found :(" />
      </MainContainer>
      <div />
    </StyledMain>
  )
}

export const Head: HeadFC = () => <title>Cat Logic - Home</title>

export const pageQuery = graphql`
  query IndexPage {
    allFile(
      filter: {childMarkdownRemark: {id: {ne: null}}, name: {ne: "index"}},
      sort: {mtime: DESC}
    ) {
      # wiki list
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

    # search data
    fusejs {
      index
      data
    }
  }
`
