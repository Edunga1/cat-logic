import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 20rem;
  display: grid;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-shadow: 1px 1px 2px pink;
`

const LogoFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100px;
`

export default function HomeLogo() {
  // TODO: need to check if the iframe is valid
  return (
    <Container>
      <LogoFrame src="https://edunga1.github.io/canvas-floating-alphabet/?w=CAT%20LOGIC"/>
    </Container>
  )
}
