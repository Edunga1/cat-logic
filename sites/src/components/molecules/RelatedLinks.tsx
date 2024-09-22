import React from "react"
import styled from "styled-components"

const Header = styled.h3`
  margin: 0;
  padding: 1rem 0 .5rem 1rem;
  font-size: 1rem;
`

const Links = styled.ul`
  list-style: none;
  padding-left: 1rem;
  margin: 0;
  font-size: .8rem;

  > li {
    padding: .1rem 0;
    line-height: 1;
    display: inline;

    ::after {
      content: " • ";
    }

    :last-child::after {
      content: "";
    }
  }
`

export default function RelatedLinks(
  { children }: { children: JSX.Element[] },
) {
  return (
    <>
      {children.length > 0 &&
        <>
          <Header>Related Links</Header>
          <Links>
            {children.map((child, index) => (
              <li key={index}>{child}</li>
            ))}
          </Links>
        </>
      }
    </>
  )
}
