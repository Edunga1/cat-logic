---
created: 2017-09-27
---
# 알고리즘 연습

## 땅따먹기 게임

https://programmers.co.kr/learn/challenge_codes/36

>영희는 땅따먹기 게임에 푹 빠졌습니다. 땅따먹기 게임의 땅은 총 N행 4열로 나누어져 있고, 모든 칸에는 점수가 쓰여 있습니다. 땅을 밟으면서 한 행씩 내려올 때, 영희는 각 행의 4칸 중 1칸만 밟으면서 내려올 수 있습니다. 땅따먹기 게임에는 같은 열을 연속해서 밟을 수가 없는 특수 규칙이 있습니다. 즉, 1행에서 (5)를 밟았다면, 2행의 (8)은 밟을 수가 없게 됩니다. 마지막 행까지 모두 내려왔을 때, 점수가 가장 높은 사람이 게임의 승자가 됩니다. 여러분이 hopscotch 함수를 제작하여 영희가 최대 몇 점을 얻을 수 있는지 알려주세요. 예를 들어
1 2 3 5 5 6 7 8 4 3 2 1 의 땅이 있다면, 영희는 각 줄에서 (5), (7), (4) 땅을 밟아 16점을 최고점으로 받을 수 있으며, hopscotch 함수에서는 16을 반환해주면 됩니다.

```javascript
function hopscotch(board, size) {
    var result = 0;
    // 함수를 완성하세요.

    return result;
}

 //아래는 테스트로 출력해 보기 위한 코드입니다.
var board = [[ 1, 2, 3, 5 ], [ 5, 6, 7, 8 ], [ 4, 3, 2, 1]];
console.log(hopscotch(board, 3));
```

---

처음 생각한 방법은 모든 경우의 수를 찾는 것이었다.

다음 행으로 넘어갈 때 마다 모든 경우에 대한 합을 저장하는 방법을 사용했다.

```javascript
// 시작 (1행)
[1, 2, 3, 5]
// 2행
// - 7, 8, 9 : 첫 행 1에서 시작할 때 모든 경우의 합: (+6, +7, +8)
// - 7, 9, 10 : 첫 행 2에서 시작할 때 모든 경우의 합: (+5, +7, +8)
// - ...
[
    7, 8, 9,
    7, 9, 10,
    8, 9, 11,
    10, 11, 12]
// 이하 마찬가지
```

문제는 다음 행으로 넘어갈 수록 계산 횟수가 기하급수적으로 늘어난다는 것이다.

2행 순회의 경우 4 * (4 - 1) = 12의 계산 수를 통해 12크기의 배열이 만들어진다.

3행 순회할 때는 12 * (4 - 1) = 36 ...

끝까지 순회할 때의 모든 경우의 수를 다 저장하는 방법은 순회할 때마다 기하급수적으로 계산 횟수가 늘어나는 것이다.

생각해보니 모두 저장할 필요 없이 **각 행에 도착할 때마다 각 자리에 올 수 있는 가장 큰 값만 저장**하면 되었다.

예를들어 :

2행에서 올 수 있는 가장 큰 값은 `5 + 5`, `5 + 6`, `5 + 7`, `3 + 8` => `[10, 11, 12, 11]`

3행에서 올 수 있는 가장 큰 값은 `12 + 4`, `12 + 3`, `11 + 2`, `12 + 1` => `[16, 15, 13, 13]`

따라서 매 행마다 고정된 계산 횟수만으로 답 `16`을 구할 수 있다.

---

풀이:

```javascript
function hopscotch(board, size) {
  const final = board.reduce((scores, row) => {
    const newScores = [];
    scores.forEach((score, iscore) => {
      row.forEach((v, iv) => {
        if (iv === iscore) return;
        if (!newScores[iv]) newScores[iv] = [];
        newScores[iv].push(score + v);
      });
    });
    return newScores.map(scores => Math.max(...scores));
  });
  return Math.max(...final);
}

 //아래는 테스트로 출력해 보기 위한 코드입니다.
var board = [[ 1, 2, 3, 5 ], [ 5, 6, 7, 8 ], [ 4, 3, 2, 1]];
console.log(hopscotch(board, 3));
```

## Linear Map

어떤 범위의 숫자를 다른 범위로 변환하는 함수.

아직 의도한대로 구현하지 못했다.

```python
from math import ceil

def linear_map(x, input_min, input_max, output_min, output_max):
    r = (x - input_min) * (output_max - output_min) / (input_max - input_min) + output_min
    return ceil(r)

data = [
    (1, 7, 0, 9),
    (1, 7, 0, 99),
    (1, 10, 0, 9),
    (1, 10, 0, 99),
]

for input_min, input_max, output_min, output_max in data:
    print(f'=== {input_min}~{input_max} > {output_min}~{output_max} ============')
    output_range = output_max - output_min + 1
    for x in range(input_min, input_max + 1):
        y = linear_map(x, input_min, input_max, output_min, output_max)
        y1 = linear_map(x + 1, input_min, input_max, output_min, output_max) if x < input_max else output_max + 1
        print(f'= x={x}\t\ty={y}\t{(y1-y)/output_range*100:.2f}%')
```

아래는 출력 결과.

```
=== 1~7 > 0~9 ============
= x=1           y=0     20.00%
= x=2           y=2     10.00%
= x=3           y=3     20.00%
= x=4           y=5     10.00%
= x=5           y=6     20.00%
= x=6           y=8     10.00%
= x=7           y=9     10.00%
=== 1~7 > 0~99 ============
= x=1           y=0     17.00%
= x=2           y=17    16.00%
= x=3           y=33    17.00%
= x=4           y=50    16.00%
= x=5           y=66    17.00%
= x=6           y=83    16.00%
= x=7           y=99    1.00%
=== 1~10 > 0~9 ============
= x=1           y=0     10.00%
= x=2           y=1     10.00%
= x=3           y=2     10.00%
= x=4           y=3     10.00%
= x=5           y=4     10.00%
= x=6           y=5     10.00%
= x=7           y=6     10.00%
= x=8           y=7     10.00%
= x=9           y=8     10.00%
= x=10          y=9     10.00%
=== 1~10 > 0~99 ============
= x=1           y=0     11.00%
= x=2           y=11    11.00%
= x=3           y=22    11.00%
= x=4           y=33    11.00%
= x=5           y=44    11.00%
= x=6           y=55    11.00%
= x=7           y=66    11.00%
= x=8           y=77    11.00%
= x=9           y=88    11.00%
= x=10          y=99    1.00%
```

0~9로 변환하는 것과 0~99로 변환 결과가 다르다. 비율이 일정하게 나눠지지 않는다.
마지막 x에 대해서 비율이 높거나 낮은 문제가 있다.
