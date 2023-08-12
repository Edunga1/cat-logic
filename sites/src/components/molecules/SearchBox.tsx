import * as React from "react"
import styled from "styled-components"
import theme from "../../constants/theme"

const StyledInput = styled.input`
  border: 1px solid ${theme.colors.accent};
  border-radius: .3rem;
`

export default function SearchBox(
  {
    onChange,
  }: {
    onChange: (query: string) => void,
  }
) {

  return (
    <StyledInput
      type="text"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

