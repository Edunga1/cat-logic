import * as React from "react"
import styled from "styled-components"
import device from "../../../constants/device"

const Container = styled.div`
  --height-offset: 3rem;
  padding-top: var(--height-offset);
  display: grid;
  grid-template-areas: "main side";
  position: relative;

  @media (${device.larger}) {
    grid-template-columns: auto 14rem;
  }
`

const Main = styled.div`
  grid-area: main;
  width: 100%;
  padding: 0 1rem;
  display: grid;
`

const Side = styled.div`
  grid-area: side;
  display: none;
  grid-area: side;
  position: sticky;
  top: 0;
  max-height: calc(100vh - var(--height-offset));
  padding: 1rem 1rem;
  overflow-y: auto;

  @media (${device.larger}) {
    display: block;
  }
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
      <Side>{side}</Side>
    </Container>
  )
}
