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

  a {
    color: ${theme.colors.link};
  }

  @media (${device.larger}) {
    padding: 30% 1rem 3rem 1rem;
  }
`

const MainContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
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
      <MainContainer>
        <SearchBox onChange={setQuery} holder="I guess..." />
        <AltContainer>{items.length} docs</AltContainer>
        <WikiList items={items} fallback="No results found :(" />
      </MainContainer>
    </Container>
  )
}

export type WikiItem = {
  path: string;
  title: string;
}

