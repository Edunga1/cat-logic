import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import "./global.css"
import { createWikiLink } from "../utils/wiki"
import { useGatsbyPluginFusejs } from "react-use-fusejs"
import Home, { WikiItem } from "../components/templates/Home"

export default function IndexPage(
  { data }: PageProps<Queries.IndexPageQuery>,
) {
  const files = parseWikiItems(data.allFile.nodes)
  const [items, setItems] = React.useState(files)
  const [query, setQuery] = React.useState("")
  const result = useGatsbyPluginFusejs(query, data.fusejs)

  React.useEffect(() => {
    if (query) {
      setItems(mapSearchResultToWikiItem(result))
    } else {
      setItems(files)
    }
  }, [query])

  return (
    <Home
      items={items}
      setQuery={setQuery}
    />
  )
}

export const Head: HeadFC = () => <title>Cat Logic - Home</title>

export const pageQuery = graphql`
  query IndexPage {
    allFile(
      filter: {childMarkdownRemark: {id: {ne: null}}}
    ) {
      # wiki list
      nodes {
        name
        fields {
          gitLogLatestDate
        }
        childMarkdownRemark {
          headings(depth: h1) {
            value
          }
          fields {
            slug
            head
          }
          frontmatter {
            created
          }
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
interface SearchResult {
  item: { name: string; title: string }
  refIndex: number
}

function mapSearchResultToWikiItem(result: SearchResult[]): WikiItem[] {
  return result
    .map(it => ({
      path: createWikiLink(it.item.name),
      title: it.item.title ?? "(Untitled)",
      head: "",
    }))
}

function parseWikiItems(nodes: Queries.IndexPageQuery["allFile"]["nodes"]): WikiItem[] {
  return nodes
    .concat()
    .map(({ fields, childMarkdownRemark }) => ({
      path: createWikiLink(childMarkdownRemark?.fields?.slug ?? ""),
      title: childMarkdownRemark?.headings?.at(0)?.value ?? "(Untitled)",
      head: childMarkdownRemark?.fields?.head ?? "",
      modified: fields?.gitLogLatestDate ? new Date(fields.gitLogLatestDate) : undefined,
    }))
    .sort((a, b) => {
      const aCreated = a.modified?.getTime() ?? 0
      const bCreated = b.modified?.getTime() ?? 0
      return bCreated - aCreated
    })
}
