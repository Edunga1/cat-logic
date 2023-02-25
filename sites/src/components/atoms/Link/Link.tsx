import * as React from "react"

const Styles = {
  textDecoration: "none",
}

export default function Link(
  { children, href }: { children: React.ReactNode; href: string },
) {
  return (
    <a href={href} style={Styles}>{children}</a>
  )
}

