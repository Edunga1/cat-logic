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

## 검색

8.0 버전부터 vector search 기능 강화가 돋보인다.

검색의 트렌드가 키워드 검색에서부터 사용자 서술형 검색으로 바뀌고 있다:

키워드 검색은 `pvc plumbing irrigation systems`와 같이 단어를 나열한다.
반면에 사용자를 기반한 서술형 검색은

- `간단하게 저녁식사 할 수 있는 곳`
- `구로동 근처 100m 내 휴대폰 판매자`

와 같이 검색하거나, 인트라넷 문서를 좀 더 찾기 쉽게 사용자 context를 제공하는 등.

#### Generative AI에서 Elasticsearch의 위치

서술형 검색이 가능한 기저에는 생성형 인공지능(Generative AI)의 발전에 있다.
하지만 private 데이터를 사용하기 위해선 fine-tuning이 필요하고 이는 데이터가 증가함에 따라 기하급수적으로 비용이 증가한다.

Elasticsearch가 늘어나는 비용 문제를 해결할 수 있다.
Generative AI, Internal Data의 brdige 역할을 Elasticsearch가 담당하는 형태로 구성한다.
예를들면 사용자 질의를 GAI API에 바로 전달하면 비용이 많지만, Elasticsearch에 먼저 질의하여 질의 정제 후 GAI API로 전달하는 것이다.

[Zalando](https://zalando.com/)라는 유럽에서 유명한 e-commerce 서비스는
로깅 및 ChatGPT와의 연동한 검색에도 Elasticsearch를 사용한다고 한다(Elasticsearch korea 세미나 중).
이런 검색에는 사용자 정보에 대한 컨텍스트가 있어야 정확한 결과를 제공할 수 있다.

## Tools

### Rally

https://github.com/elastic/rally

ES 벤치마크 도구.

### Elastic Agent

https://github.com/elastic/elastic-agent

GUI기반 ES 모니터링, Integration 관리, 로그 검색 등을 제공하는 도구.
