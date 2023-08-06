import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { useGatsbyPluginFusejs } from "react-use-fusejs"
 
export default function Search() {
  const data = useStaticQuery(graphql`
    query Fusejs {
      fusejs {
        index
        data
      }
    }
  `)
 
  const [query, setQuery] = React.useState('')
 
  // fusejs 객체를 가공 없이 그대로 넘긴다
  const result = useGatsbyPluginFusejs(query, data.fusejs)
  console.log(result)
 
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {result.map(({ item }) => (
          <li key={item.name}>{item.title ?? "(untitled)"}</li>
        ))}
      </ul>
    </div>
  )
}
