import * as React from "react"
import styled from "styled-components"
import Toc from "../../components/molecules/Toc"
import WikiContent from "../../components/molecules/WikiContent"
import device from "../../constants/device"
import theme from "../../constants/theme"
import Link from "../atoms/Link"
import Comments from "../molecules/Comments"
import HomeLink from "../molecules/HomeLink"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: fit-content;

  @media (${device.larger}) {
    grid-template-columns: minmax(200px, 1fr) minmax(500px, 1000px);
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

const TitleContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: .5rem;
`

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.foreground};
`

const ModificationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
`

const LastModified = styled.p`
  font-size: .7rem;
  color: ${theme.colors.lowlight};
`

export default function Wiki(
  {
    title,
    tableOfContents,
    relatedLinksToc,
    wikiContents,
    slug,
    lastModified,
    lastCommitHash,
  }: {
    title?: string
    tableOfContents: string
    relatedLinksToc: JSX.Element[]
    wikiContents: string
    slug: string
    lastModified?: Date
    lastCommitHash?: string
  },
) {
  const relatedItems = relatedLinksToc.map((item, index) => (
    <li key={index}>{item}</li>
  ))
  const containerRelatedLinks = <div>
    <RelatedLinksHeader>Related Links</RelatedLinksHeader>
    <RelatedLinks>{relatedItems}</RelatedLinks>
  </div>
  // TODO: Separate to a component and add a link to the repository
  const modifiedTime = lastModified
    ? <LastModified>{lastModified.toLocaleString()}</LastModified>
    : null
  const commitHash = lastCommitHash
    ? <LastModified>{lastCommitHash.substring(0, 6)}</LastModified>
    : null

  return (
    <Container>
      <Side>
        {relatedLinksToc.length > 0 ? containerRelatedLinks : null}
      </Side>
      <Main>
        <TitleContainer>
          <HomeLink slug={slug} />
          <Title>{title}</Title>
        </TitleContainer>
        <ModificationContainer>{modifiedTime}{commitHash}</ModificationContainer>
        <Toc contents={tableOfContents} />
        {<WikiContent contents={wikiContents} />}
        <Comments />
      </Main>
    </Container>
  )
}
