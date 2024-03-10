import * as React from "react"
import styled from "styled-components"

const A = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default function Link(
  { children, href }: { children: React.ReactNode; href: string },
) {
  return (
    <A href={href}>{children}</A>
  )
}

