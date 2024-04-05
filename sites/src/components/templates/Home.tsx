import * as React from "react"
import styled from "styled-components"
import device from "../../constants/device"
import theme from "../../constants/theme"
import HomeLogo from "../atoms/HomeLogo"
import SearchBox from "../molecules/SearchBox"
import WikiCatalog from "../molecules/WikiCatalog"

const Container = styled.div`
  padding-top: 10%;
  color: ${theme.colors.foreground};
  overflow: hidden;
  display: grid;

  a {
    color: ${theme.colors.link};
  }

  @media (${device.larger}) {
    padding: 1rem 1rem 3rem 1rem;
  }
`

const MainContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
`

const Counter = styled.div`
  font-size: 0.8rem;
  color: ${theme.fonts.body};
`

export default function Home(
  { items, setQuery }: { items: Wiki[]; setQuery: (arg0: string) => void },
) {
  return (
    <Container>
      <MainContainer>
        <HomeLogo />
        <SearchBox onChange={setQuery} holder="I guess..." />
        <Counter>{items.length} docs</Counter>
        <WikiCatalog items={items} fallback="No results found :(" />
      </MainContainer>
    </Container>
  )
}

export type Wiki = {
  path: string;
  title: string;
  head: string;
  lastModified?: Date;
}

