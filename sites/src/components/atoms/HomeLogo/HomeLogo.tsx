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

export default function HomeLogo() {
  return (
    <Container>
      CAT LOGIC
    </Container>
  )
}
