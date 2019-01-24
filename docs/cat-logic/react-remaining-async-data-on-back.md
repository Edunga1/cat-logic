---
id: page-86
time: 2019-01-24 14:06:45
tag: react, javascript
---

# React 뒤로가기 시 비동기로 가져온 데이터 유지하기

예제: https://github.com/Edunga1/react-history-back-example

핵심은 비동기로 **데이터를 가져오고 상태를 업데이트 할 때마다 적당한 곳에도 데이터를 저장**하는 것이다.
그리고 `componentDidMount()`에서 적당한 곳에 **저장한 데이터가 있는지 보고, 있으면 가져온다**.

```javascript
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import storage from './storage/storage';

export default class List extends Component {
  state = {
    index: 0,
    items: [],
  }

  componentDidMount() {
    const { history, location } = this.props;
    if (!location.state) {
      this.update();
    } else {
      this.setState({ ...location.state });
      history.replace(undefined, undefined);
    }
  }


  update() {
    const { index, items } = this.state;
    const { history } = this.props;

    storage(index).then((res) => {
      this.setState({
        index: res.next,
        items: items.concat(res.pokemons),
      }, () => {
        history.replace(undefined, { ...this.state });
      });
    });
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <input
          type="button"
          style={{ position: 'fixed', right: '10%', top: '25%' }}
          onClick={() => this.update()}
          value="Fetch!!!!!!!!"
        />
        {
          items.map(x => (
            <a key={x} href={`./what?q=${x}`}>
              <div>
                {x}
              </div>
            </a>
          ))
        }
      </div>
    );
  }
}

List.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};
```

적당한 곳이라면 History, Storage(Local, Session), Redux가 있다.
Storage는 Local이라면 다른 탭과 공유되기도 하고, Session이라도 데이터를 serialize 하여 저장하기 때문에 번거롭고, Redux라면 다른 도메인으로 이동한 뒤 돌아오면 유지되지 않을거라 예상된다.
그래서 History를 이용. 더 정석적인 방법이라 생각된다.

위 코드는 `react-router`의 history를 사용한 것이라 브라우저의 history를 사용하려면
`window.history.replaceState()`와 같은 것을 사용해야 할 거 같다.

31번 라인에서 `history.replace(undefined, undefined)` 상태를 초기화하였는데,
초기화하지 않으면 새로고침해도 상태가 유지된다.
초기화 하려면 탭을 닫고 다시 로드하는 수 밖에 없다.
앱 특성에 따라 유지해도 괜찮겠다.
