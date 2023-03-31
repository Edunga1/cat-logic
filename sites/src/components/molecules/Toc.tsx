import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  margin: 4rem 2rem 0 0;
  font-size: 0.8rem;
  & ul {
    list-style: none;
    padding-left: 1rem;
    & p {
      margin: 0;
    }
  }
  & a {
    text-decoration: none;
  }
`

export default function Toc(
  { contents }: { contents: string },
) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: contents }} />
  )
}
