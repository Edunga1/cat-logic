# HTML

## <meta> 메타데이터 요소

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

### Open Graph Protocol

https://ogp.me/

![Open Graph Protocol](./res/open-graph-protocol-example.png)

위 이미지 같은 미리보기를 구성하는데 사용하는 메타 태그를 가리킨다.
head 태그 안에 meta 태그와 `og:` 접두사를 가진 속성이 이 프로토콜의 사양이다.

위 StackOverflow 질문은 아래와 같은 메타데이터를 가지고 있다:

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://stackoverflow.com/questions/44131207/could-any-one-tell-me-the-real-reason-of-spring-data-projection-in-my-case">
<meta property="og:site_name" content="Stack Overflow">
<meta property="og:image" itemprop="image primaryImageOfPage" content="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded">
<meta name="twitter:title" property="og:title" itemprop="name" content="Could any one tell me the real reason of spring-data projection in my case?">
```

위에서 `og:type`, `og:url`, `og:image`, `og:title` 4개가 기본 메타데이터이고, `og:site_name`은 선택적인 메타데이터이다.
선택 메타데이터는 이미지 크기를 조정한다거나, 설명을 추가하는 등 다양한 종류가 있다.

트위터의 경우 Twitter Card라 부르는 독립적인 메타데이터를 사용하는데, 위의 `twitter:title`이 해당한다.

## 구역 제목 요소

`<h1>` `<h6>` 등 heading tag.

### h1 여러개 사용하는 것을 피할 것

[Avoid using multiple `<h1>` elements on one page - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#avoid_using_multiple_h1_elements_on_one_page)

> While using multiple `<h1>` elements on one page is allowed by the HTML standard (as long as they are not nested), this is not considered a best practice. A page should generally have a single `<h1>` element that describes the content of the page (similar to the document's <title> element).

`<h1>` 여러개를 사용하는 것이 허용되긴 하지만, 좋은 방법은 아니다.
페이지에는 보통 페이지의 내용을 설명하는 하나의 `<h1>` 요소가 있어야 한다.

SEO 관점에서 하나만 있는 것이 좋다고 한다.
