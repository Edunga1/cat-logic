import * as React from "react"
import styled from "styled-components"
import theme from "../../constants/theme"
import HomeLogo from "../atoms/HomeLogo"
import SearchBox from "../molecules/SearchBox"
import WikiCatalog from "../molecules/WikiCatalog"
import PageLayout from "./layout/PageLayout"

const Counter = styled.div`
  font-size: 0.8rem;
  color: ${theme.fonts.body};
`

export default function Home(
  { items, setQuery }: { items: Wiki[]; setQuery: (arg0: string) => void },
) {
  return (
    <PageLayout>
      <div>
        <HomeLogo />
        <SearchBox onChange={setQuery} holder="I guess..." />
        <Counter>{items.length} docs</Counter>
        <WikiCatalog items={items} fallback="No results found :(" />
      </div>
    </PageLayout>
  )
}

export type Wiki = {
  path: string;
  title: string;
  head: string;
  lastModified?: Date;
}

