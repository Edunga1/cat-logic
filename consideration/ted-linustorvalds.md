# TED - Linus Torvalds

[TED - 리누스 토발스(Linus Torvalds): 리눅스의 기본 철학](https://www.ted.com/talks/linus_torvalds_the_mind_behind_linux?language=ko)

## 좋은 코드

14:20 장면을 보면 Linked list의 node를 제거하는 method를 구현한 2가지 코드를 비교하여 보여준다.

**Code 1**
```c
remove_list_entry(entry)
{
    prev = NULL;
    walk = head;

    // Walk the lsit

    while (walk != entry) {
        prev = walk;
        walk = walk->next;
    }

    // Remove the entry by updating the
    // head or the previous entry

    if (!prev)
        head = entry->next;
    else
        prev->next = entry->next;
}
```

**Code 2**
```c
remove_list_entry(entry)
{
    // The "indirect" pointer points to the
    // *address* of the thing we'll update

    indirect = &head;

    // Walk the list, looking for the thing that
    // points to the entry we want to remove

    while ((*indirect) != entry)
        indirect = &(*indirect)->next;

    // ... and just remove it
    *indirect = entry->next;
}
```

차이점은 마지막 부분의 if-else 키워드의 유무이다.

첫 번째 코드는 명시적으로 조건문을 통해 제거하려 하는 노드가 첫 번째 노드인지 아닌지에 따라 다르게 처리한다.
그러나 두 번째 코드는 제거하려는 노드가 가리키는 주소를 다음 노드로 변경한다.

리누스 토발스가 말하는 것은 특수 조건이 사라지면서 코드가 더 간결해 진다는 것이다.

알고리즘 순서도 만 보더라도 분기가 생기면 복잡한 그림이 된다.

### 그러나 항상 두 번째 코드만 좋은 코드인가?

직관적인 것을 따지면 두 번째 코드보다 첫 번째 코드가 더 직관적이다.
사람이 생각하는 것을 따라가 보면 이전 노드가 없는 **첫 번째 노드**와 이전 노드가 있는 **그 외 노드**들은
다르게 처리 되어야 하는 것이 맞다. 그리고 이 생각을 그대로 옮긴 것이 첫 번째 코드가 되는 것이다.

위 코드들은 정말 간단하지만, 더 큰 모듈이 된다면 두 번째 코드와 같은 방식은 이해하는데 시간이 걸릴 것이다.

**그러나** 개발자들은 협업하면서 서로의 모듈을 건드리지 않는다.
서로가 구현한 모듈의 인터페이스만 알면 된다.
내가 다른 사람의 모듈을 사용할 때 어떤 값을 주어서 결과만 잘 나오면 된다.

그러면 어떤 방법이 더 나은 것인가? - END -

## 리누스 토발스의 개발자 자세

16:40 장면부터

자신은 git, linux와 같은 프로젝트를 만들었음에도 예지자가 아니라고 한다.

하늘을 보며 걷는(미래 지향적인) 사람들과 일하는 게 좋으며,
자신은 그 **사람들이 구멍에 빠지지 않게 구멍을 메우는 일**을 한다고 한다.

회사라면 인프라를 구축하는 일을 하는 것이다. 정말 멋진 자세인 거 같다.
