import * as React from "react"
import styled from "styled-components"
import Toc from "../../components/molecules/Toc"
import WikiContent from "../../components/molecules/WikiContent"
import device from "../../constants/device"
import Comments from "../molecules/Comments"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: fit-content;

  @media (${device.larger}) {
    grid-template-columns: minmax(300px, 1fr) minmax(400px, 1000px);
  }
`

const Side = styled.div`
  display: none;

  & > div:nth-child(2) {
    padding-top: 1rem;
  }

  @media (${device.larger}) {
    display: block;
  }
`

const Main = styled.div`
  padding: 0 1rem;
  overflow: auto;

  @media (${device.larger}) {
    & > div:nth-child(2) {
      display: none;
    }
  }
`

export default function Wiki(
  {
    title,
    tableOfContents,
    relatedLinksToc,
    wikiContents,
  }: {
    title?: string
    tableOfContents: string
    relatedLinksToc: JSX.Element[]
    wikiContents: string
  },
) {
  return (
    <Container>
      <Side>
        <Toc contents={tableOfContents} />
        <span>{relatedLinksToc}</span>
      </Side>
      <Main>
        <h1>{title}</h1>
        <Toc contents={tableOfContents} />
        {<WikiContent contents={wikiContents} />}
        <Comments />
      </Main>
    </Container>
  )
}
