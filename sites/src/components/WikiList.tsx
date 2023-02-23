import * as React from "react"

const listItemStyles = {
  listStyleType: "none",
}

export default function WikiList(
  { items }: WikiListProps,
) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} style={listItemStyles}>
          <a href={item.path}>
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

interface WikiListProps {
  items: { id: string; title: string; path: string }[]
}
