import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 400,
}

const IndexPage: React.FC<PageProps> = (
  data,
) => {
  console.log(data)
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        WORK IN PROGRESS
      </h1>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
