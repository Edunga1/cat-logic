import * as React from "react"
import styled from "styled-components"
import Link from "../atoms/Link/Link"
import ListItem from "../atoms/ListItem/ListItem"
import theme from "../../constants/theme"
import device from "../../constants/device"

const List = styled.ul`
  padding: 0 1rem;
  width: 100%;
  max-width: 600px;

  > * {
    padding: .3rem 0;
    :not(:last-child) {
      border-bottom: 1px solid ${theme.colors.accent}55;
    }
  }

  @media (${device.larger}) {
    border: 1px solid ${theme.colors.accent};
    border-radius: .5rem;
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
    <div>
      {hasItems
        ? <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <Link href={item.path}>
                  {item.title}
                </Link>
              </ListItem>
            ))}
          </List>
        : <Fallback>{fallback}</Fallback>
      }
    </div>
  )
}

interface WikiListProps {
  items: { id: string; title: string; path: string }[]
  fallback?: string
}
