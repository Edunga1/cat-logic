# AngualrJS에서 ViewModel 정적 타이핑하기 (VSCode)

컨트롤러 내에서 `vm`(ViewModel)으로 뷰 모델을 관리 할 때 타입 힌팅을 제대로 얻을 수 없다.

```javascript
function controller() {
    var vm = this;

    /**
     * @typedef CustomType
     * @property {number} foo
     * @property {string} var
     */
    /**
     * @type {Array.<CustomType>}
     */
    vm.list = []; // any
}
```

따라서 뷰 모델에 `@typedef`로 하위 모델들을 명시하면서 해결했다.

```javascript
function controller() {
    /**
     * @typedef CustomType
     * @property {number} foo
     * @property {string} var
     */
    /**
     * @typedef {ViewModel}
     * @property {Array.<CustomType>} list
     */
    /**
     * @type {ViewModel}
     */
    var vm = this;

    vm.list = []; // Array.<{}>
}
```
