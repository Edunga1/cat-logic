import * as React from "react"

const Style = {
  listStyleType: "none",
}

export default function ListItem(
  props: { children: React.ReactNode },
) {
  return (
    <li style={Style} >{props.children}</li>
  )
}
