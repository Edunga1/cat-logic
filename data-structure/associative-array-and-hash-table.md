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
