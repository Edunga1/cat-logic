import * as React from "react"
import Link from "../atoms/Link/Link";
import ListItem from "../atoms/ListItem/ListItem";

export default function WikiList(
  { items }: WikiListProps,
) {
  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Link href={item.path}>
            {item.title}
          </Link>
        </ListItem>
      ))}
    </ul>
  )
}

interface WikiListProps {
  items: { id: string; title: string; path: string }[]
}
