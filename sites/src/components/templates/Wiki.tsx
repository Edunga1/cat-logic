import * as React from "react"
import styled from "styled-components"
import Toc from "../../components/molecules/Toc"
import WikiContent from "../../components/molecules/WikiContent"
import device from "../../constants/device"
import theme from "../../constants/theme"
import Comments from "../molecules/Comments"
import HomeLink from "../molecules/HomeLink"
import GitHubCommitLink from "../organisms/GitHubCommitLink"
import PageLayout from "./layout/PageLayout"

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

const TitleBottom = styled.div`
  display: flex;
  justify-content: flex-end;
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
    gitHubRepositoryUrl,
  }: {
    title?: string
    tableOfContents: string
    relatedLinksToc: JSX.Element[]
    wikiContents: string
    slug: string
    lastModified?: Date
    lastCommitHash?: string
    gitHubRepositoryUrl?: string
  },
) {
  const relatedItems = relatedLinksToc.map((item, index) => (
    <li key={index}>{item}</li>
  ))
  const containerRelatedLinks = <div>
    <RelatedLinksHeader>Related Links</RelatedLinksHeader>
    <RelatedLinks>{relatedItems}</RelatedLinks>
  </div>
  const githubLink = lastModified
    ? <GitHubCommitLink
        lastModified={lastModified}
        gitHubRepositoryUrl={gitHubRepositoryUrl}
        hash={lastCommitHash}
      />
    : null

  return (
    <PageLayout>
      {relatedLinksToc.length > 0 ? containerRelatedLinks : null}
      <Main>
        <TitleContainer>
          <HomeLink slug={slug} />
          <Title>{title}</Title>
        </TitleContainer>
        <TitleBottom>{githubLink}</TitleBottom>
        <Toc contents={tableOfContents} />
        <WikiContent contents={wikiContents} />
        <Comments />
      </Main>
    </PageLayout>
  )
}
