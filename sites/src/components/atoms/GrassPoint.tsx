import React from "react"
import styled from "styled-components"

const Container = styled.div<
  {
    highlighted?: boolean
  }
>`
  width: .5rem;
  height: .5rem;
  background-color: ${props => props.highlighted ? "rgba(200,200,200,1)" : "rgba(192,222,191,1)"};

  > span {
    font-size: .5rem;
    top: 1rem;
    white-space: nowrap;
    transform: rotate(-15deg);
    position: inherit;
    cursor: default;
    user-select: none;
  }
`

export default function GrassPoint(
  {
    label,
    highlighted,
    className,
  }: {
    label?: string
    highlighted?: boolean
    className?: string
  },
) {
  return (
    <Container
      className={className}
      highlighted={highlighted}
    >
      <span>{label}</span>
    </Container>
  )
}
