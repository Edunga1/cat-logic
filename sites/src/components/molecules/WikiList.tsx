import * as React from "react"
import styled from "styled-components"
import Link from "../atoms/Link/Link"
import ListItem from "../atoms/ListItem/ListItem"
import device from "../../constants/device"

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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

const Fallback = styled.p`
  font-weight: bold;
  --bg-size: 400%;
  --color-one: hsl(15 90% 55%);
  --color-two: hsl(40 95% 55%);
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;

  @media (prefers-reduced-motion: no-preference) {
    animation: move-bg 8s linear infinite;
    @keyframes move-bg {
      to {
        background-position: var(--bg-size) 0;
      }
    }
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
              <Link href={item.path}>
                {item.title}
              </Link>
            </ListItem>
          ))}
        </List>
        : <Fallback>{fallback}</Fallback>
      }
    </Container>
  )
}

interface WikiListProps {
  items: { title: string; path: string }[]
  fallback?: string
}
