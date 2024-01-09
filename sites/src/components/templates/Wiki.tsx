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

  @media (${device.larger}) {
    display: block;
  }
`

const Main = styled.div`
  padding: 0 1rem;
  overflow: auto;
`

const RelatedLinksHeader = styled.h3`
  margin: 0;
  padding: 1rem 0 0 1rem;
  font-size: 1rem;
`

const RelatedLinks = styled.ul`
  list-style: none;
  padding-left: 1rem;
  margin: 0;

  > li {
    padding: 0;
    line-height: 1;
  }
`

const ContainerEmptyLinks = styled.div`
  padding: 1rem;
  opacity: 0.3;
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
  const relatedItems = relatedLinksToc.map((item, index) => (
    <li key={index}>{item}</li>
  ))
  const containerRelatedLinks = <div>
    <RelatedLinksHeader>Related Links</RelatedLinksHeader>
    <RelatedLinks>{relatedItems}</RelatedLinks>
  </div>
  const containerEmptyRelatedLinks = <ContainerEmptyLinks>No related links were calculated :\</ContainerEmptyLinks>
  return (
    <Container>
      <Side>
        <div>{relatedLinksToc.length > 0 ? containerRelatedLinks : containerEmptyRelatedLinks}</div>
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
