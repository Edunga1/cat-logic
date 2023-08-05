import * as React from "react"
import styled from "styled-components"
import Toc from "../../components/molecules/Toc"
import WikiContent from "../../components/molecules/WikiContent"

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(400px, 1000px);
  width: fit-content;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    & > div:nth-child(1) {
      display: none;
    }
  }
`

export default function Wiki(
  {
    tableOfContents,
    relatedLinksToc,
    wikiContents,
  }: {
    tableOfContents: string
    relatedLinksToc: JSX.Element[]
    wikiContents: string
  },
) {
  return (
    <Container>
      <div>
        <Toc contents={tableOfContents} />
        {relatedLinksToc}
      </div>
      {<WikiContent contents={wikiContents} />}
    </Container>
  )
}
