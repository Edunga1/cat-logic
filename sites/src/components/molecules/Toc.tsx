import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  box-sizing: border-box;
  padding: 4rem 2rem 0 0;
  background-color: #f5f5f5;

  ul {
    list-style: none;
    padding-left: 1rem;
    font-size: .8rem;
    font-weight: bold;

    ul {
      font-size: .6rem;
      font-weight: normal;
    }

    p {
      margin: 0;
    }
  }

  a {
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
