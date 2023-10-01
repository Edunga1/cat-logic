import * as React from "react"
import styled from "styled-components"
import device from "../../constants/device"
import theme from "../../constants/theme"
import SearchBox from "../molecules/SearchBox"
import WikiList from "../molecules/WikiList"

const Container = styled.div`
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

export default function Home(
  { items, setQuery }: { items: WikiItem[]; setQuery: (arg0: string) => void },
) {
  return (
    <Container>
      <div />
      <MainContainer>
        <SearchBox onChange={setQuery} holder="I guess..." />
        <AltContainer>{items.length} docs</AltContainer>
        <WikiList items={items} fallback="No results found :(" />
      </MainContainer>
      <div />
    </Container>
  )
}

export type WikiItem = {
  id: string;
  path: string;
  title: string;
}

