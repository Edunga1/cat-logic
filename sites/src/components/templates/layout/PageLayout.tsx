import * as React from "react"
import styled from "styled-components"
import device from "../../../constants/device"
import theme from "../../../constants/theme"

const Container = styled.div`
  padding-top: 10%;
  color: ${theme.colors.foreground};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  a {
    color: ${theme.colors.link};
  }

  @media (${device.larger}) {
    padding: 1rem 1rem 3rem 1rem;
    grid-template-columns: .5fr minmax(auto, 50rem) 10rem;
    > :nth-child(1) {
      grid-column: 2;
    }
    > :nth-child(2) {
      grid-column: 3;
      position: fixed;
    }
  }
`

const Main = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: grid;
`

const Side = styled.div`
  display: none;

  @media (${device.larger}) {
    display: block;
    padding: 1rem 1rem;
    height: 100%;
    overflow-y: auto;
  }
`

export default function PageLayout(
  { children }: { children: React.ReactNode | React.ReactNode[] },
) {
  const [main, side] = Array.isArray(children)
    ? [children[0], children.slice(1)]
    : [children, null]
  return (
    <Container>
      <Main>{main}</Main>
      <Side>{side}</Side>
    </Container>
  )
}
