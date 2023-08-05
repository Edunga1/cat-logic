import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding: 1rem 1rem 1rem 0;

  ul {
    list-style: none;
    padding-left: 1rem;
    margin: 0;
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
