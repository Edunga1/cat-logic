---
created: 2023-10-31
---
# 임베딩

임베딩은 콘텐츠를 벡터로 변환하는 것.

예를들어 word2vec은 단어를 벡터로 변환한다.

## Cat Logic에 적용해보기

[임베딩(Embeddings)은 무엇이고 왜 중요한가](https://news.hada.io/topic?id=11593) 글을 읽고 내 TIL 블로그도 똑같이 적용해보고 싶어졌다.

필자는 Open AI의 임베딩 API를 사용해서 "관련 글"을 구현했다고 한다.
블로그 글을 임베딩하여 결과를 SQLite에 저장하고 코사인 유사성을 계산했는데 그 비용이 매우 저렴해서 0.04 달러 밖에 들지 않았다고.
필요할 때마다 변경된 글만 임베딩하면 되므로 유지 비용도 크게 들지 않을 것으로 보인다.
다만, Open AI의 독점 모델을 사용했는데 모델이 종료되면서 변경해야 했단다.

---

위에서 언급한 글에서는 Open AI의 [text-embedding-ada-002](https://platform.openai.com/docs/api-reference/embeddings) 모델을 사용했는데, 텍스트를 변환하는 모델이다.

> The input must not exceed the max input tokens for the model (8192 tokens for text-embedding-ada-002) and cannot be an empty string.

`text-embedding-ada-002`는 총 8192 tokens을 받을 수 있다. 단어나 구둣점 등이 토큰으로 취급되니 긴 글은 초과할 수도 있겠다.

검색을 좀 해보니, 한글 성능도 괜찮다고 한다.
오히려 무료 한글 모델이 성능이 부족하다고 하니 로컬에서 우선적으로 테스트하는 용도로 사용해 볼 듯.

---

2023-11-02

[KoBERT](https://github.com/SKTBrain/KoBERT)를 시도해 보고있다.
22년 이후로 관리되지 않아서인지 설치하는데 애먹고 있다.
이슈 탭만 보더라도 많은 사람들이 설치에 어려움을 겪고 있다.
파이썬 의존성 설치와 관련된 문제다. 아쉽게도 README에 환경에 대해서 잘 명세하지 않고 있다.
포크 받아서 의존성 버전 수정하면 어떻게든 해볼 수 있을 듯.

---

2023-11-05 **임베딩을 직접 해봤다**.

KoBERT는 환경 구성이 번거로워서 포기했다.
나중에 시간이 나면 해볼 생각이다.

OpenAI의 `text-embedding-ada-002` 모델을 사용해 보았다.
아쉽게도 ChatGPT를 예전부터 사용하고 있어서 무료 크레딧이 모두 만료되어 있었다. 총 $18 제공 했었는데.

[Cat Logic](./cat-logic.md) 문서를 임베딩 했고, Cosine 유사도를 계산해 보았다.
OpenAI를 호출하고 csv로 저장하는 파이썬 코드와 임베딩 결과를 모두 Cat Logic 저장소에 올려두었다:\
https://github.com/Edunga1/cat-logic/tree/main/embeddings

총 83개의 문서를 처리했다. 한 번에 8천개 토큰 만큼만 호출할 수 있다.
그래서 문서를 토큰 기준으로 자를 필요가 있다. 문자열 길이로 자르면 토큰 수 계산이 일정하게 되지 않는다.

[tiktoken](https://pypi.org/project/tiktoken/)으로 토큰을 계산할 수 있다.

한글은 단어당 토큰을 더 많이 사용한다. `orange`는 1토큰인 반면에 `귤`은 2토큰이다.
단어를 토큰화하면 일련의 숫자 배열인 토큰으로 변한다. 이것을 인코딩이라 한다.
배열 크기가 토큰 수가 된다. 다시 디코딩하면 토큰이 단어로 변한다.
인코딩과 디코딩을 통해 텍스트를 토큰 기준으로 자를 수 있다.
다만 한글은 1개의 글자가 2개 토큰이 되기도 하므로 경계가 잘리면 의미없는 값이 나올 수 있다.
전체 문서중 아주 작은 부분일 것이므로 무시하기로 했다.

어쨌든 임베딩하면 다차원 배열로 임베딩 결과가 나오게 되고,
이걸 numpy로 읽어서, 코사인 유사도를 계산하면 된다.

다음은 [javascript.md](./javascript.md) 문서와 다른 문서들의 유사도를 계산한 결과다:

```bash
                    filename_x                                         filename_y  similarity
0   ../docs/wiki/javascript.md                         ../docs/wiki/javascript.md    1.000000
46  ../docs/wiki/javascript.md                             ../docs/wiki/nodejs.md    0.882524
66  ../docs/wiki/javascript.md                          ../docs/wiki/angularjs.md    0.868043
32  ../docs/wiki/javascript.md                            ../docs/wiki/reactjs.md    0.860560
1   ../docs/wiki/javascript.md                                ../docs/wiki/web.md    0.854540
54  ../docs/wiki/javascript.md                       ../docs/wiki/architecture.md    0.852273
2   ../docs/wiki/javascript.md  ../docs/wiki/2016-08-27-gdg-webtech-workshop-n...    0.849046
58  ../docs/wiki/javascript.md                         ../docs/wiki/clean-code.md    0.848594
29  ../docs/wiki/javascript.md                              ../docs/wiki/webgl.md    0.845717
35  ../docs/wiki/javascript.md             ../docs/wiki/programming-philosophy.md    0.845219
17  ../docs/wiki/javascript.md        ../docs/wiki/object-oriented-programming.md    0.842636
40  ../docs/wiki/javascript.md               ../docs/wiki/programming-paradigm.md    0.841840
74  ../docs/wiki/javascript.md               ../docs/wiki/software-development.md    0.841606
42  ../docs/wiki/javascript.md                           ../docs/wiki/gatsbyjs.md    0.839241
41  ../docs/wiki/javascript.md                        ../docs/wiki/inspiration.md    0.838280
69  ../docs/wiki/javascript.md                            ../docs/wiki/physics.md    0.829791
56  ../docs/wiki/javascript.md                             ../docs/wiki/jargon.md    0.828210
79  ../docs/wiki/javascript.md                  ../docs/wiki/experience-review.md    0.826690
14  ../docs/wiki/javascript.md                   ../docs/wiki/machine-learning.md    0.825359
5   ../docs/wiki/javascript.md  ../docs/wiki/2016-11-16-google-campus-two-thin...    0.824535
43  ../docs/wiki/javascript.md                     ../docs/wiki/design-pattern.md    0.823865
50  ../docs/wiki/javascript.md                          ../docs/wiki/jetbrains.md    0.822214
22  ../docs/wiki/javascript.md                          ../docs/wiki/cat-logic.md    0.820970
73  ../docs/wiki/javascript.md                        ../docs/wiki/code-review.md    0.819712
64  ../docs/wiki/javascript.md                             ../docs/wiki/kotlin.md    0.819240
8   ../docs/wiki/javascript.md                                ../docs/wiki/git.md    0.818140
25  ../docs/wiki/javascript.md                               ../docs/wiki/html.md    0.817782
24  ../docs/wiki/javascript.md                              ../docs/wiki/shell.md    0.817766
55  ../docs/wiki/javascript.md                            ../docs/wiki/unity3d.md    0.816814
67  ../docs/wiki/javascript.md                                ../docs/wiki/vim.md    0.816136
75  ../docs/wiki/javascript.md                           ../docs/wiki/database.md    0.814912
61  ../docs/wiki/javascript.md            ../docs/wiki/test-driven-development.md    0.814854
57  ../docs/wiki/javascript.md           ../docs/wiki/language-server-protocol.md    0.812373
15  ../docs/wiki/javascript.md                             ../docs/wiki/devops.md    0.812291
47  ../docs/wiki/javascript.md  ../docs/wiki/continuous-integration-and-deploy...    0.811741
13  ../docs/wiki/javascript.md                            ../docs/wiki/testing.md    0.811093
39  ../docs/wiki/javascript.md                              ../docs/wiki/tools.md    0.809628
28  ../docs/wiki/javascript.md             ../docs/wiki/programming-convention.md    0.808528
65  ../docs/wiki/javascript.md                            ../docs/wiki/c-sharp.md    0.808382
6   ../docs/wiki/javascript.md                   ../docs/wiki/spring-framework.md    0.807617
4   ../docs/wiki/javascript.md                   ../docs/wiki/idea-methodology.md    0.807293
37  ../docs/wiki/javascript.md                            ../docs/wiki/unicode.md    0.806298
68  ../docs/wiki/javascript.md                    ../docs/wiki/ionic-framework.md    0.806017
72  ../docs/wiki/javascript.md                                ../docs/wiki/css.md    0.805362
49  ../docs/wiki/javascript.md                               ../docs/wiki/book.md    0.804810
82  ../docs/wiki/javascript.md                            ../docs/wiki/vimwiki.md    0.802841
21  ../docs/wiki/javascript.md                           ../docs/wiki/markdown.md    0.801383
23  ../docs/wiki/javascript.md                              ../docs/wiki/vuejs.md    0.800746
81  ../docs/wiki/javascript.md                     ../docs/wiki/data-structure.md    0.794468
16  ../docs/wiki/javascript.md                             ../docs/wiki/python.md    0.794347
59  ../docs/wiki/javascript.md                               ../docs/wiki/java.md    0.793991
18  ../docs/wiki/javascript.md                              ../docs/wiki/linux.md    0.793489
10  ../docs/wiki/javascript.md                             ../docs/wiki/docker.md    0.793108
19  ../docs/wiki/javascript.md                               ../docs/wiki/sfml.md    0.792960
9   ../docs/wiki/javascript.md                 ../docs/wiki/algorithm-practice.md    0.792566
44  ../docs/wiki/javascript.md                               ../docs/wiki/game.md    0.792278
36  ../docs/wiki/javascript.md                      ../docs/wiki/elasticsearch.md    0.791766
60  ../docs/wiki/javascript.md        ../docs/wiki/windows-subsystem-for-linux.md    0.791548
80  ../docs/wiki/javascript.md                   ../docs/wiki/google-analytics.md    0.791235
30  ../docs/wiki/javascript.md                             ../docs/wiki/sentry.md    0.790978
12  ../docs/wiki/javascript.md                             ../docs/wiki/mac-os.md    0.789427
20  ../docs/wiki/javascript.md                            ../docs/wiki/windows.md    0.789279
7   ../docs/wiki/javascript.md                                ../docs/wiki/aws.md    0.788144
53  ../docs/wiki/javascript.md                            ../docs/wiki/swagger.md    0.787858
31  ../docs/wiki/javascript.md                              ../docs/wiki/valve.md    0.786964
51  ../docs/wiki/javascript.md                          ../docs/wiki/quotation.md    0.786382
38  ../docs/wiki/javascript.md                            ../docs/wiki/logging.md    0.785585
45  ../docs/wiki/javascript.md                         ../docs/wiki/kubernetes.md    0.785464
70  ../docs/wiki/javascript.md                        ../docs/wiki/html-canvas.md    0.782338
26  ../docs/wiki/javascript.md                      ../docs/wiki/data-analysis.md    0.782211
3   ../docs/wiki/javascript.md                            ../docs/wiki/crontab.md    0.777749
52  ../docs/wiki/javascript.md                               ../docs/wiki/jira.md    0.777742
63  ../docs/wiki/javascript.md                            ../docs/wiki/network.md    0.777385
48  ../docs/wiki/javascript.md                               ../docs/wiki/rust.md    0.777058
71  ../docs/wiki/javascript.md                ../docs/wiki/reverse-engineering.md    0.776867
27  ../docs/wiki/javascript.md                           ../docs/wiki/hardware.md    0.774096
62  ../docs/wiki/javascript.md                             ../docs/wiki/github.md    0.772994
34  ../docs/wiki/javascript.md                  ../docs/wiki/computer-graphics.md    0.772767
76  ../docs/wiki/javascript.md                ../docs/wiki/reactive-extensions.md    0.770802
78  ../docs/wiki/javascript.md                               ../docs/wiki/mail.md    0.767006
77  ../docs/wiki/javascript.md                              ../docs/wiki/redis.md    0.758210
33  ../docs/wiki/javascript.md                            ../docs/wiki/airflow.md    0.753884
```

자기 자신과의 유사도는 1이다. 1에 가까울수록 유사도가 높다.\
`javascript.md` 문서와 `nodejs.md` 문서가 가장 유사하다.\
`javascript.md` 문서와 `redis.md` 문서가 가장 유사하지 않다.

같은 자바스크립트 관련 문서인 `nodejs.md`, `reactjs.md`, `angularjs.md`는 유사도가 높다.
납득이 가는 결과라 만족스럽다.

임베딩 API를 사용하는데 총 0.03 달러가 소모되었다. 한국 돈으로 40원 정도다.
[wikidocs](https://wikidocs.net/200466) 문서에 따르면 ada-002 모델로 어린 왕자 책 분량인 4만 토큰을 임베딩하는데 0.016 달러가 소모된다고 한다.
