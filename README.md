# hi-dva

## 在effects中使用延迟

```js
import { delay } from 'dva/saga';

effects: {
    *asyncAdd({ payload }, { put, call }) {
      // 并不能直接用setTimeout
      yield call(delay, 1000);
      yield put({ type: 'add', payload });
    },
  },
```

## 初始化多个model

```js
// [/models/index.js]
const context = require.context('./', false, /\.js$/);

// context is a Object
export default context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key));

// ---------------------------
// [index.js]
require('./models').default.forEach(key => app.model(key.default));
```

## model中effects和reducers重名问题

> 不要在effects和reducers里定义重复名称的函数，会重复执行，因为dva分不清该执行哪个。

## 路由

```js
// 1.
import { withRouter } from 'dva/router';

// 2.
export default withRouter(Counter);

// 3.
<button onClick={() => history.push('/')}> go to home </button>
```