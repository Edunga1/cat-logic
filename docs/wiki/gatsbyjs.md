---
created: 2023-02-25
---
# GatsbyJS

React를 사용하는 정적 사이트 생성 도구.

> the fastest frontend for the headless web. Build modern websites with React.

https://github.com/gatsbyjs/gatsby

## Slugify

기본 튜토리얼을 따라 홈페이지를 만든다면 File System Route API를 사용하게 되는데,
[라우팅 시 자동으로 slugify](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#routing-and-linking)한다.

이는 의도한대로 path를 만들지 않을 수 있다는 의미다.
[slugify](https://github.com/sindresorhus/slugify)라는 라이브러리를 사용하는데, slug로 사용할 수 없는 문자도 있다.

slugify는 cli 도구로 제공해서 테스트해볼 수 있다:

```bash
$ npx slugify-cli 'wh안at'
wh-at

# "/인공지능"의 URI encoding
$ npx slugify-cli '/%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5'
ec-9-d-b8-ea-b3-b5-ec-a7-80-eb-8-a-a5
```

한글이나 특수문자를 변환하는 모습이다.

> If you have a route called `src/pages/wholesome/{Animal.slogan}.js` where `slogan` is `I ♥ Dogs` the final URL will be `/wholesome/i-love-dogs`.
> Gatsby will convert the field into a human-readable URL format while stripping it of invalid characters.

사람이 읽을 수 있는 URL로 변환한다지만, 영어가 아닌 언어는 제대로 변환되지 않는다.
slugify를 끌 수 있는 방법은 찾지 못했다.

## Gitbook에서 GatsbyJS로 이전했다.

GatsbyJS 이전에는 [GitBook](https://github.com/GitbookIO/gitbook)을 사용했다.

Gitbook은 오픈소스이며 pdf, epub 등 전자책 변환을 제공하고, 정적 사이트 생성을 제공하고 SEO, Analytics 등 다양한 플러그인을 제공했다. 하지만 2018년에 개발이 중단되었다.\
새로운 버전은 일부 유료로 제공되고, 클로즈드 소스로 전환되었다.\
이제 더 이상 사용할 이유가 없어졌다.

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

## 주의할 점

### 배포 환경과 로컬 환경의 상이

로컬에서 생성된 페이지와 실제 배포하여 호스팅된 페이지 내용이 달라질 수 있음을 인지해야 한다.

`gatsby-source-filesystem`를 사용하여 파일을 읽거나, 문서 목록을 보여주는 화면을 구현했는데,
파일의 `mtime` 또는 `ctime`을 사용했다가 배포 환경에서는 `mtime`이 모두 동일하다보니 로컬에서 문서 목록의 정렬과 배포 환경에서의 정렬이 달라졌다.

`gatsby-transformer-gitinfo` 플러그인은 git 정보를 읽어서 `lastModified` 필드를 추가해준다.
이 경우는 잘 이해가 안되었는데, 이 플러그인도 GitHub Actions의 배포 환경에서는 모두 동일한 시간으로 표시되었다.
이는 내가 빌드 프로세스를 잘못 이해하고 있는 걸 수도 있다.

위 두 플러그인 문제가 아니더라도, GraphQL 쿼리에 정렬이 없다면 정렬 순서가 배포 환경에서는 달라질 수 있다.
명시적으로 정렬하는 편이 좋겠다.

## Issues

### 마크다운 파일간 링크를 변환하지 않음

[Is it possible to create a link in a Gatsby .md file using the markdown path, not the eventual url?](https://stackoverflow.com/questions/62013570/is-it-possible-to-create-a-link-in-a-gatsby-md-file-using-the-markdown-path-no)

GatsbyJS는 markdown 파일간 링크를 자동 변환해주지 않는다.
이는 사용자가 slug를 생성하고, path를 지정하는데서 간접적으로 알게되는 부분.

```markdown
[Link to another document](./another-doc.md)
```

빌드하면 `./current-doc/another-doc.md`로 링크가 생성되고, 이는 당연히 동작하지 않는다.

이를 처리하려면 Markdown AST를 순회, 링크를 찾아서 변환해야 한다.

이를 위한 플러그인을 작성했다: \
https://github.com/edunga1/gatsby-remark-relative-linker

`npm install github:edunga1/gatsby-remark-relative-linker`로 설치하고,
`gatsby-config.js`에 `gatsby-transformer-remark` 플러그인 옵션에 추가한다:

```json
{
  resolve: "gatsby-transformer-remark",
  options: {
    plugins: [
      "gatsby-remark-relative-linker",
    ],
  },
}
```

개인적으로 이 문제를 비롯하여, GatsbyJS가 특정 형태의 정적 페이지 말고는 사용하기 어렵겠다고 판단되어, 이주를 고려중이다.
처리 방식은 분명 다양하게 있을텐데, 이건 꽤 오래된 이슈라서 개선할 가능성이 없어보인다.

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

### 링크 경로에 space 포함 시 링크가 동작하지 않는 문제

마크다운 파일 기준이며, html로 변환되면서 링크가 올바르게 동작하지 않아서 확인 중.

### 개발 모드에서 이미지가 제대로 나오지 않는 문제

`gatsby-transformer-remark`의 서브 플러그인 `gatsby-remark-images` 사용 시 이미지가 제대로 나오지 않는 문제.

이미지가 blur로 나온다면 로컬 캐시를 지워보면 해결된다. `gatsby clean`으로 캐시를 지울 수 있다.
빌드 되면서 파일 경로가 매번 변경되는 것과 관련된 것이 아닌가 추정. 크리티컬한 문제는 아니다.
