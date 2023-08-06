import { graphql, PageProps } from "gatsby"
import * as React from "react"
import { useGatsbyPluginFusejs } from "react-use-fusejs"
import Link from "../../components/atoms/Link/Link"
import { createWikiLink } from "../../utils/wiki"
 
export default function Search(
  { data }: PageProps<Queries.FusejsQuery>,
) {
  const [query, setQuery] = React.useState("")
  const result = useGatsbyPluginFusejs(query, data.fusejs)
 
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {result.map(({ item }) => (
          <li key={item.name}>
            <Link href={createWikiLink(item.name)}>
              {item.title ?? "(untitled)"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const searchQuery = graphql`
  query Fusejs {
    fusejs {
      index
      data
    }
  }
`
