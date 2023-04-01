import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  padding-left: 1rem;

  a {
    text-decoration: none;
  }
`

export default function WikiContent(
  { contents }: { contents: string },
) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: contents }} />
  )
}
