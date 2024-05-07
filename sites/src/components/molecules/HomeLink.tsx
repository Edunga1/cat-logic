import * as React from "react"
import styled from "styled-components"
import theme from "../../constants/theme"
import Link from "../atoms/Link"

const Container = styled.div`
  font-size: 2rem;
  text-align: right;

  a {
    color: ${theme.colors.foreground};
    opacity: 0.2;
    font-weight: 700;

    &:hover {
      text-decoration: none;
    }

    &:after {
      content: "»";
      margin-left: .1rem;
    }
  }
`

export default function HomeLink(
  { slug }: { slug: string },
) {
  const [href, setHref] = React.useState("")

  React.useEffect(() => {
    setHref(removeSlugFromPath(window.location.href, slug))
  })

  return (
    <Container>
      <Link href={href}>CAT</Link>
    </Container>
  )
}

function removeSlugFromPath(href: string, slug: string): string {
  // remove slug from href and return the path
  const url = new URL(href)
  return url.pathname.replace(`wiki${slug}`, "")
}
