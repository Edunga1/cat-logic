import * as React from "react"
import styled from "styled-components"
import Link from "../atoms/Link/Link"
import ListItem from "../atoms/ListItem/ListItem"
import ColorfulParagraph from "../atoms/ColorfulParagraph/ColorfulParagraph"
import Small from "../atoms/Small/Small"

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 600px;

  > * {
    padding: .3rem 0;
  }
`

export default function WikiList(
  { items, fallback }: WikiListProps,
) {
  const hasItems = items.length > 0
  const now = new Date()
  return (
    <Container>
      {hasItems
        ? <List>
          {items.map((item, i) => (
            <ListItem key={i}>
              <Link href={item.path}>{item.title}</Link>
              {item.head && <i><Small>{item.head}</Small></i>}
              {item.modified && isRecent(item) && <Small>({formatRecentDT(now, item.modified)})</Small>}
            </ListItem>
          ))}
        </List>
        : <ColorfulParagraph>{fallback}</ColorfulParagraph>
      }
    </Container>
  )
}

function isRecent(item: { modified?: Date }): boolean {
  if (!item.modified) return false
  const now = new Date()
  const diff = now.getTime() - item.modified.getTime()
  return diff < 24 * 60 * 60 * 3000  // 72 hours
}

function formatRecentDT(source: Date, dest: Date): string {
  const diff = (source.getTime() - dest.getTime()) / 1000 / 60 / 60
  // 3 hours ago
  return `${Math.floor(diff)} hours ago`
}

interface WikiListProps {
  items: {
    title: string;
    path: string;
    head?: string;
    modified?: Date;
  }[]
  fallback?: string
}
