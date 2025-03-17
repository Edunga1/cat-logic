import * as React from "react"
import styled from "styled-components"
import device from "../../../constants/device"

const Container = styled.div`
  padding-top: 3rem;
  display: grid;
  position: relative;

  @media (${device.larger}) {
    grid-template-columns: 0.5fr minmax(auto, 50rem) 10rem;
    > :nth-child(1) {
      grid-column: 2;
    }
    > :nth-child(2) {
      grid-column: 3;
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

const SideContent = styled.div`
  position: fixed;
`

export default function PageLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [main, side] = Array.isArray(children)
    ? [children[0], children.slice(1)]
    : [children, null]
  return (
    <Container>
      <Main>{main}</Main>
      <Side>
        <SideContent>{side}</SideContent>
      </Side>
    </Container>
  )
}
