import * as React from "react"
import styled from "styled-components"
import Link from "../atoms/Link/Link"
import ListItem from "../atoms/ListItem/ListItem"
import theme from "../../theme"

const List = styled.ul`
  padding: 1rem;
  border: 1px solid ${theme.colors.accent};
  border-radius: .5rem;
`

export default function WikiList(
  { items }: WikiListProps,
) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Link href={item.path}>
            {item.title}
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

interface WikiListProps {
  items: { id: string; title: string; path: string }[]
}
