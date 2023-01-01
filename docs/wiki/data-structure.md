# 자료구조

<!--toc:start-->
- [자료구조](#자료구조)
- [Associative Array와 Hash Table](#associative-array와-hash-table)
  - [Associative Array (연관 배열)](#associative-array-연관-배열)
    - [특징](#특징)
  - [Hash Table](#hash-table)
    - [Hash?](#hash)
      - [간단한 예](#간단한-예)
    - [그 외](#그-외)
- [Graph](#graph)
- [Heap](#heap)
- [Set - 집합](#set-집합)
<!--toc:end-->

# Associative Array와 Hash Table

## Associative Array (연관 배열)

Key-Value로 이루어진 자료구조. Hash Table, Dictionary로 불리기도 한다.

### 특징

Value는 중복되어도 상관 없으나 Key는 중복되어선 안된다. Key로 값을 찾기 때문.

Key를 기준으로 정렬된다.

## Hash Table

Key가 hash로 결정되는 연관 배열.

### Hash?

일련의 정보를 문자열로 재배열 하는 것.

암호화를 의미하는 것이 아님.

One-way이므로 hash를 원래 데이터로 복구할 수 없음.

같은 hash가 나타나는 현상인 충돌(collision)이 발생할 수 있음.

#### 간단한 예

사용자 정보(성, 이름, 생년월일)을 표현하는 간단한 구조를 Hashing.

```
       Sam (19 + 1 + 13)
     Jones (10 + 15 + 14 + 5)    = (77)
04/04/1990 (04 + 04 + 1990)      = (1998)  Hash : 2075

       Fay (6 + 1 + 25)
     Adams (1 + 4 + 1 + 13 + 19) = (70)
10/10/1985 (10 + 10 + 1985)      = (2005)  Hash : 2075
```

위 두 정보는 같은 hash를 가지는 충돌이 발생함.

### 그 외

충돌을 대비하는 알고리즘이 필요하다.

# Graph

Vertex와 Edge로 이루어진 자료구조.

Linked List, Graph, Heap은 모두 Graph의 일종.

Edge에 가중치를 준 Weighted Graph도 있다.

가중치를 준 그래프는 길찾기 알고리즘 등에 사용된다.

# Heap

정렬된 완전 이진 트리.

Priority Queue (우선순위 큐)라고 불리기도 함.

내림차순 / 오름차순으로 정렬되었는지에 따라 Min Heap, Max Heap라고 불린다.

Min Heap : 부모가 항상 자식보다 작은 값을 가짐.

Max Heap : 부모가 항상 자식보다 큰 값을 가짐.

* Fully Sorted 상태는 아님 - 형제간 대소구분을 하지 않음
* insert 시점에 부모와 비교, swap, 전파(swap 후 영향이 있는 인접 노드들에 전파) 함

# Set - 집합

해시 테이블의 일종

* 정렬되지 않음
* Key, Index, Sequence가 없음
* 중복을 허용하지 않음
* Fast lookup
