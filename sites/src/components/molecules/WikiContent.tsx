import * as React from "react"
import styled from "styled-components"
import theme from "../../constants/theme"

const Container = styled.div`
  overflow: auto;
  overflow-wrap: break-word;
  color: ${theme.colors.foreground};

  // heading style
  h1, h2, h3, h4, h5, h6 {
    margin: 1.5rem 0 .8rem;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }

  // link style
  a {
    text-decoration-style: dotted;

    &:visited {
      color: ${theme.colors.linkVisited};
    }
  }

  // inline code block style
  code:not(pre code) {
    background-color: #f5f5f5;
    border-radius: .5rem;
    padding: .2rem .4rem;
    word-break: break-word;
  }

  // code block style
  pre:has(code) {
    font-size: 85%;
    background-color: #f5f5f5;
    border-radius: .5rem;
    padding: 1rem;
    overflow: auto;
  }

  // limits image size to prevent image overs container
  img {
    max-width: 100%;
  }

  // quote style
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
  }

  // table style
  table {
    width: 100%;
    border-collapse: collapse;

    td, th {
      padding: .2rem .5rem;
    }

    thead {
      background-color: ${theme.colors.background2};
    }

    tbody {
      font-size: .8rem;

      tr:nth-child(even) {
        background-color: ${theme.colors.background2};
      }

      tr:hover {
        background-color: ${theme.colors.backgroundHighlight};
      }
    }
  }

  // hr style
  hr {
    border: none;
    border-top: 1px dashed #aaa;
  }
`

export default function WikiContent(
  { contents }: { contents: string },
) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: contents }} />
  )
}
