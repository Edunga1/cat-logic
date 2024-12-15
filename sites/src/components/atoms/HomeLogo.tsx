import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 20rem;
  display: flex;
  align-items: center;
`

const LogoFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 7rem;
`

export default function WhatLogo() {
  return (
    <Container>
      <LogoFrame src="https://edunga1.github.io/canvas-floating-alphabet/?w=SPRING%20HAS%20SPRUNG&t=1&s=5&i=1"/>
    </Container>
  )
}
