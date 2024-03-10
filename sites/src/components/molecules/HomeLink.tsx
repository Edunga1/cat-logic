import * as React from "react"
import styled from "styled-components"
import theme from "../../constants/theme"
import Link from "../atoms/Link/Link"

const Container = styled.div`
  text-align: right;
  margin-top: 1rem;

  a {
    color: ${theme.colors.foreground};
    opacity: 0.2;
  }
`

export default function HomeLink(
  { slug }: { slug: string },
) {
  return (
    <Container>
      <Link href={removeSlugFromPath(slug)}>CAT LOGIC</Link>
    </Container>
  )
}

function removeSlugFromPath(slug: string): string {
  // remove slug from href and return the path
  const url = new URL(window.location.href)
  return url.pathname.replace(`wiki${slug}`, "")
}
