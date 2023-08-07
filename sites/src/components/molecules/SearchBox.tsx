import * as React from "react"

export default function SearchBox(
  {
    onChange,
  }: {
    onChange: (query: string) => void,
  }
) {

  return (
    <div>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

