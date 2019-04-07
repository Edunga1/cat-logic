---
id: page-90
time: 2019-03-26 22:41:36
tag: vuejs, component
---
# VueJS `<transition>`

`<transition>`을 이용한 모달 컴포넌트:<br>
https://kr.vuejs.org/v2/examples/modal.html

transition 컴포넌트 설명:<br>
https://kr.vuejs.org/v2/guide/transitions.html

`<transition>` 안에 엘리먼트를 작성하면
`transition` 컴포넌트로 출력/감춤에 대한 다양한 상태를 관리할 수 있다.

```
<transition name="FOO">
  <div>Hello</div>
</transition>
```

단순히 컨텐츠를 wrapping만 하고, CSS로 여러가지 일을 할 수 있다.

```css
.FOO-enter {
  opacity: 0;
}
.FOO-leave-active {
  opacity: 0;
}
.FOO-enter .FOO-container,
.FOO-leave-active .FOO-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
```

이렇게 CSS를 설정하고 `<transition>` 태그를
`v-if` 등으로 감추고 출력해보면 CSS에 명세한 애니메이션이 적용된다.
