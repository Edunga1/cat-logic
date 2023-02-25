import * as React from "react"

const Style = {
  textDecoration: "none",
}

export default function Link(
  { children, href }: { children: React.ReactNode; href: string },
) {
  return (
    <a href={href} style={Style}>{children}</a>
  )
}

