---
created: 2023-02-25
---
# Gatsby

React 기반 웹사이트 프레임워크.

> the fastest frontend for the headless web. Build modern websites with React.

https://github.com/gatsbyjs/gatsby

## GraphQL 타입 자동 생성하기

https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/

GraphQL에 대한 타입을 직접 명세할 필요 없다. gatsby 설정을 통해 자동으로 타입을 생성한다.

먼저, `gatsby-config.js` 설정에 `graphqlTypegen: true`를 추가한다.

쿼리에 이름을 `WikiList`와 같이 지정하고, 인자를 `{ data }: PageProps<Queries.WikiListQuery>`로 지정한다:

```jsx
export default function IndexPage(
  { data }: PageProps<Queries.WikiListQuery>,
) {
  const { edges, totalCount } = data.allMarkdownRemark
  const items = edges.map(({ node }) => ({
    id: node.id,
    path: `./wiki/${node.id}`,
    title: node.headings?.at(0)?.value ?? "(Untitled)",
  }))

  return (
    <main style={pageStyles}>
      <h1>
        {totalCount} Pages
      </h1>
      <WikiList items={items} />
    </main>
  )
}

export const pageQuery = graphql`
  query WikiList {
    allMarkdownRemark {
      edges {
        node {
          id
          headings(depth: h1) {
            value
          }
        }
      }
      totalCount
    }
  }
`
```

타입 정보는 `gatsby-types.d.ts`에 자동으로, `Queries` 네임스페이스에 `~Query` 접미사를 붙여서 정의된다.

## 파일명을 마크다운 문서의 URL로 사용하기

https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=files#helper-functions

[gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem) 플러그인과 [Gatsby Node API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)를 이용한다.\
Node API는 `gatsby-node.ts`을 통해 GraphQL에 데이터를 추가할 수 있다.\
`gatsby-source-filesystem` 플러그인은 파일 경로를 가져올 수 있는 `createFilePath` 함수를 제공한다.

파일명을 `MarkdownRemark`에 추가하기 위해, `gatsby-node.ts`에 다음과 같이 정의한다:

```ts
import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}
```

이제 `MarkdownRemark`에 `slug` 필드가 추가되었으므로, Query에서 `slug`를 사용할 수 있다:

```ts
export const pageQuery = graphql`
  query WikiList {
    allMarkdownRemark {
      edges {
        node {
          id
          headings(depth: h1) {
            value
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
```

`fields.slug`로 접근하면 된다.

## Issues

### 다른 `.md` 파일에 대한 링크를 생성할 수 없는 문제

[Is it possible to create a link in a Gatsby .md file using the markdown path, not the eventual url?](https://stackoverflow.com/questions/62013570/is-it-possible-to-create-a-link-in-a-gatsby-md-file-using-the-markdown-path-no)

내가 원하는 동작은 깃허브 내에서도 `.md` 간 링크가 동작하는 것이다. 링크 뿐만 아니라 다른 기능도 마찬가지. gatsby의 정적 사이트에서도 마찬가지로 동작해야 한다.

```markdown
[Link to another document](./another-doc.md)
```

위 코드가 GitHub에서는 정상적으로 링크가 동작한다.\
하지만 gatsby에서는 `./current-doc/another-doc.md`로 링크가 생성되고, 동작하지 않는다.

내부 링크를 변경해주는 플러그인이 있긴 하지만, 이 이슈에 해결할 수 있는 플러그인은 없다.
SO 질문도 이게 가능한지 묻는 것이고, 답변은 gatsby 빌드에 맞춰서 링크를 설정하라는 것이다.
아쉬운 부분. 😢

#### 해결 방법

처리한 방법:\
https://github.com/Edunga1/cat-logic/commit/b2762545eb481fde2dfc8deb5ebbade31fab38a7

`replaceAll`을 이용해서 `.md`를 제거하고, `../`를 추가한다:
```typescript
// replace markdown links to wiki pages with internal links
// e.g. <a href="./javascript.md"> -> <a href="../javascript">
export default function replaceWikiLinks(text: string) {
  const regex = /<a href="\.\/([^"]+)\.md">/g
  return text.replaceAll(
    regex,
    (_, p1) => {
      return `<a href="../${p1}">`
    }
  )
}
```

`<a href="./javascript.md">`를 `<a href="../javascript">`로 변경하는 방법이다.

와중에 주석만 작성하고, 코드는 copilot이 작성해줬다. 😎 (<- 이 부분도 copilot이 작성해줬다. 괄호 안에 있는 것도!)

### 사이트에 중간 경로가 있으면 이미지가 보여지지 않는 문제

[gatsby-remark-images](https://www.gatsbyjs.com/plugins/gatsby-remark-images/) 플러그인을 사용해서, markdown에서 이미지를 사용하는 경우 문제가 있다.
이런 이미지를 inline image라고 부른다.
컨텐츠가 아닌 사이트를 구성하는 이미지의 경우 [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) 플러그인을 사용한다.

`gatsby develop`로 로컬에서 확인할 때는 문제가 없지만, github pages나 netlify 등 사이트를 배포하게 되면 이미지 경로를 찾지 못하고 흐릿하게 표시된다.
도메인 바로 뒤에 내 사이트를 나타내는 경로를 포함하여 호스팅되기 때문이다.

사실 이미지 뿐만 아니라 다른 파일도 마찬가지기 때문에
gatsby config는 [pathPrefix](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/) 옵션을 제공한다.

> Many applications are hosted at something other than the root (/) of their domain. For example, a Gatsby blog could live at example.com/blog/, or a site could be hosted on GitHub Pages at example.github.io/my-gatsby-site/. Each of these sites needs a prefix added to all paths on the site. So a link to /my-sweet-blog-post/ should be rewritten as /blog/my-sweet-blog-post.

특히 링크에서 그렇다. 왜 그런지는 모르겠지만, 상대 경로가 아닌 절대 경로로 생성하고 있어서 path prefix를 추가해야 한다.

이미지 문제를 해결하기 위해 커뮤니티 플러그인이 개발되어 있었다:
* https://www.gatsbyjs.com/plugins/gatsby-remark-images-anywhere
* https://www.gatsbyjs.com/plugins/gatsby-remark-relative-images
* https://www.gatsbyjs.com/plugins/gatsby-remark-relative-images-v2

문제는 이 플러그인들은 더 이상 관리되지 않는다. 지금 설치하면 오래된 dependency로 취약점 경고가 많이 뜬다.
`pathPrefix`를 사용하는 것은 너무 번거로워 보여서, 다른 방법을 찾아봐야 겠다.

### pnpm 사용 시 빌드가 실패하는 문제

pnpm에 등록된 이슈로 확인하자: https://github.com/pnpm/pnpm/issues/991

`gatsby build` `gatsby develop` 모두 실패한다.

```bash
Module not found: Error: Can't resolve 'prop-types' in '.../.cache'
```

이 문제를 해결하기 위한 별도 플러그인이 있다: https://github.com/Js-Brecht/gatsby-plugin-pnpm

플러그인을 추가할 정도로 pnpm의 가치가 있어야 할텐데.
