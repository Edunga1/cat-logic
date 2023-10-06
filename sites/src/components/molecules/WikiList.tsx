import * as React from "react"
import styled from "styled-components"
import Link from "../atoms/Link/Link"
import ListItem from "../atoms/ListItem/ListItem"
import device from "../../constants/device"
import theme from "../../constants/theme"
import ColorfulParagraph from "../atoms/ColorfulParagraph/ColorfulParagraph"

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  small {
    margin-left: .5rem;
    color: ${theme.colors.foreground}
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0 1rem;
  width: 100%;
  max-width: 600px;
  font-style: italic;

  > * {
    padding: .3rem 0;
  }

  @media (${device.larger}) {
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
              <Link href={item.path}>{item.title}</Link>{item.head && <small>{item.head}</small>}
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
