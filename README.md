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