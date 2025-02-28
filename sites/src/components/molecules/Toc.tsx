import * as React from "react"
import styled from "styled-components"
import theme from "../../constants/theme"

const Header = styled.h3`
  margin: 0;
  padding: 1rem 0 .5rem 1rem;
  font-size: 1rem;
`

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 1rem 1rem 0;

  ul {
    list-style: none;
    padding-left: 1rem;
    margin: 0;
    font-size: .8rem;

    p {
      margin: 0;
    }
  }

  // link style
  a {
    text-decoration: none;
    color: ${theme.colors.link};

    &:hover {
      color: ${theme.colors.highlight};
    }
  }
`

export default function Toc(
  {
    className,
    contents,
  }: {
    className?: string,
    contents: string,
  },
) {
  return (
    <div className={className} >
      <Header>Table of Contents</Header>
      <Container dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )
}
