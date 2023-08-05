import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  overflow: auto;
  padding: 0 1rem;

  a {
    text-decoration: none;
  }

  pre {
    font-size: 85%;
    background-color: #f5f5f5;
    border-radius: .5rem;
    padding: 1rem;
    overflow: auto;
  }
`

export default function WikiContent(
  { contents }: { contents: string },
) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: contents }} />
  )
}
