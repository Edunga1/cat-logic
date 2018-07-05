# string.search 사용 시 예외

**단순히** 문자열에 특정 단어가 있는지 포함되어 있는지만 보려고 할 때
```string.search``` 보다는 ```string.include```가 더 나을 수 있다.

```javascript
var keyword = '\\';
var text = '다람쥐 챗바퀴';

if (text.search(keyword) != -1) { // Invalid regular expression
    console.log('found');
}
```

위 처럼 인자에 백슬러시가 들어가면 예외가 발생할 수 있기 때문

```javascript
var keyword = '\\';
var text = '다람쥐 챗바퀴';

if (text.includes(keyword)) {
    console.log('found');
}
```

이 경우는 ```string.includes```를 사용하면 더욱 간단해 진다.
