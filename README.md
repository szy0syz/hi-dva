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