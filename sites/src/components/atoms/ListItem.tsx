import * as React from "react"

const Styles = {
  listStyleType: "none",
}

export default function ListItem(
  props: { children: React.ReactNode },
) {
  return (
    <li style={Styles}>{props.children}</li>
  )
}
