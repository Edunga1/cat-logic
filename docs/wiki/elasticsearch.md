---
created: 2023-10-08
---
# Elasticsearch

[Apache Lucene](https://lucene.apache.org/core/) 라이브러리 기반 검색엔진이다.
[Apache Solr](https://solr.apache.org/)도 lucene을 기반으로 만들어졌다.

Lucene은 Java로 작성된 검색 엔진 라이브러리이다.

## 기본 개념

Elasticsearch는 cluster, node, index, shard, segment, document로 구성된다.

Cluster
- Elasticsearch에서 가장 큰 단위다.
- 여러개의 노드를 관리한다.

Node
- 여러개의 Shard(thread)로 이루어진다.
- 무결성과 HA를 위한 샤드 Replication.
- 복제된 샤드는 다른 노드에 위치한다.
- 노드는 Java Process다.
- 일반적으로 서버 1대당 노드 하나를 설치하지만, 설정을 통해 2개 이상도 가능하다.

검색 엔진은 inverted index 구조로 저장하고, Term으로 Document ID를 검색한다.

### Text Analysis (텍스트 분석)

> Text analysis enables Elasticsearch to perform full-text search, where the search returns all relevant results rather than just exact matches.

ref. [Text analysis overview](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-overview.html)

Elasticsearch가 full-text search 할 수 있게하는 것이 텍스트 분석이다.

Analyzer라는 도구가 텍스트 분석하고, character filtering -> tokenizing -> token filtering 순서로 처리한다.
tokenizer는 일반적으로 [Whitespace tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-tokenizer.html)가 사용된다.
token filtering 과정에서 알파벳 대소 변환, 불용어 제거, 복수형 저장, 동의어 처리(quick은 fast로도 저장)를 통해 검색에 유용한 형태로 만든다.

REST API로 analyzer API를 사용할 수 있다.

한글은 복합어로 이루어져 있어서 영어에 비해 좀 더 복잡하다.
따라서 사전 기반 분석이 필요한데, 한국어 형태로 분석기로 `온전한닢`, `Nori` 등이 있다.
[Nori](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-nori.html)는 Elasticsearch 플러그인으로 제공된다.

keyword field 검색 시 대소문자까지 구분하여 검색할 수 있다.

### 검색

8.0 버전부터 vector search 기능 강화가 돋보인다.

검색의 트렌드가 키워드 검색에서부터 사용자 서술형 검색으로 바뀌고 있다:

키워드 검색은 `pvc plumbing irrigation systems`와 같이 단어를 나열한다.
반면에 사용자를 기반한 서술형 검색은

- `간단하게 저녁식사 할 수 있는 곳`
- `구로동 근처 100m 내 휴대폰 판매자`

와 같이 검색하거나, 인트라넷 문서를 좀 더 찾기 쉽게 사용자 context를 제공하는 등.

전통적인 검색으로 충분하지 않아서, vector search가 추가되었다.

객체의 유사도로 그룹화하여 검색에서 사용한다.
이미지, 오디오, document 모두 vector화 저장할 수 있다.
조회 시 벡터로 가져와서 처리하고, document를 반환한다.
ML 모델로 벡터화하는데, 대표적인 모델로 BERT를 사용한다.

ES 8.0부터 벡터 저장을 제공한다.

검색을 위해서 벡터는 그래프로 저장된다.
전통적인 검색과 벡터 검색을 함께 사용할 수 있다. 이를 hybrid scoring이라고 한다.
bm25는 전통적인 검색에, [knn](https://ko.wikipedia.org/wiki/K-%EC%B5%9C%EA%B7%BC%EC%A0%91_%EC%9D%B4%EC%9B%83_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)은 벡터 검색을 위해 사용한다.

third-party 모델을 사용하는 방법도 제공한다.

#### Generative AI에서 Elasticsearch의 위치

서술형 검색이 가능한 기저에는 생성형 인공지능(Generative AI)의 발전에 있다.
하지만 private 데이터를 사용하기 위해선 fine-tuning이 필요하고 이는 데이터가 증가함에 따라 기하급수적으로 비용이 증가한다.

Elasticsearch가 늘어나는 비용 문제를 해결할 수 있다.
Generative AI, Internal Data의 brdige 역할을 Elasticsearch가 담당하는 형태로 구성한다.
예를들면 사용자 질의를 GAI API에 바로 전달하면 비용이 많지만, Elasticsearch에 먼저 질의하여 질의 정제 후 GAI API로 전달하는 것이다.

[Zalando](https://zalando.com/)라는 유럽에서 유명한 e-commerce 서비스는
로깅 및 ChatGPT와의 연동한 검색에도 Elasticsearch를 사용한다고 한다(Elasticsearch korea 세미나 중).
이런 검색에는 사용자 정보에 대한 컨텍스트가 있어야 정확한 결과를 제공할 수 있다.

### Aggregation

[Search Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)

집계(Aggregation)는 3가지 종류로 나뉜다:

- Bucket: docuemnt를 그룹화한다. 필드 값, 범위 등을 기준으로 그룹화한다.
- Metric: document를 측정한다. 필드 값의 합계나 평균 등을 계산한다.
- Pipeline: 문서나 필드 대신 다른 집계의 결과를 사용한다. 다른 결과에 대한 추가 처리를 한다.

### Indexing

Round Robin 방식으로 document를 shard에 분배한다.
따라서 Document ID를 안다면 검색 없이 조회할 수 있다.

Query Phase
- 쿼리는 가장 먼저 모든 샤드에 전달된다.
- 각 샤드는 요청만큼 처리하고 결과를 반환한다.

Fetch Phase
- 노드는 각 샤드의 결과를 모은다.
- 결과를 랭킹 점수를 기반으로 정렬한다.
- 결과를 요청만큼 반환한다.

(확인 필요) 예로, 요청 수가 10개라면 각 샤드에 10개를 요청하고,
노드는 각 샤드의 결과를 정렬하고 다시 10개를 반환한다.

랭킹 알고리즘은 [TF/IDF, ES5부터 BM25](https://news.hada.io/topic?id=9034)를 사용한다.

랭킹 기준 정렬이 필요해서 1~1000 검색이나 990~1000 검색이나 쿼리 처리 규모가 비슷하다.

### Lucene Segment

inverted index, document value, 워본 문서 등을 저장한다.
document의 insert, delete만 가능하고 update는 delete 후 insert로 처리한다.

세그먼트 병합을 통해 새로운 세그먼트를 생성한다. 비용이 큰 작업이다.
오래된 세그먼트는 비교적 크고, 최근 것은 작다.

한 번 생성된 세그먼트는 변경되지 않는다(immutable).
병합을 통해 2개 세그먼트를 합치는데, 메모리에서 처리 후 flush를 통해 영구 저장한다.
세그먼트의 병합은 자동, 수동으로 할 수 있다.

### Security

[Role 기반](https://www.elastic.co/guide/en/elasticsearch/reference/current/authorization.html)으로 민감 데이터를 보호할 수 있다. ES 8.8부터 추가되었다고 한다.

## Tools

### Rally

https://github.com/elastic/rally

ES 벤치마크 도구.

### Elastic Agent

https://github.com/elastic/elastic-agent

GUI기반 ES 모니터링, Integration 관리, 로그 검색 등을 제공하는 도구.
