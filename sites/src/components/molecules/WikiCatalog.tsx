import * as React from "react"
import styled from "styled-components"
import Link from "../atoms/Link/Link"
import ListItem from "../atoms/ListItem/ListItem"
import ColorfulParagraph from "../atoms/ColorfulParagraph/ColorfulParagraph"
import Small from "../atoms/Small/Small"

const Container = styled.div`
  width: 100%;
  display: flex;
`

const List = styled.ul`
  margin: 0;
  padding: 0;

  > * {
    padding: .3rem 0;
  }
`

export default function WikiList(
  { items, fallback }: WikiListProps,
) {
  const hasItems = items.length > 0
  return (
    <Container>
      {hasItems
        ? <List>
          {items.map((item, i) => (
            <ListItem key={i}>
              <Link href={item.path}>{item.title}</Link>{item.head && <i><Small>{item.head}</Small></i>}
            </ListItem>
          ))}
        </List>
        : <ColorfulParagraph>{fallback}</ColorfulParagraph>
      }
    </Container>
  )
}

interface WikiListProps {
  items: { title: string; path: string; head?: string }[]
  fallback?: string
}
