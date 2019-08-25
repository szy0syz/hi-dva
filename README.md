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

## 路由1

```js
// 1.
import { withRouter } from 'dva/router';

// 2.
export default withRouter(Counter);

// 3.
<button onClick={() => history.push('/')}> go to home </button>
```

## 路由2

```js
import { Link } from 'dva/router';

<Link to='/'>home page</Link>
```

## 路由3

```js
const Counter = ({ counter, dispatch, history }, context) => {
  // context.router.history.push('/')
}

// 必须定义
Counter.contextTypes = {
  router: propTypes.object,
};
```

## 路由4

```js
import { routerRedux } from 'dva/router';

<button onClick={() => dispatch(routerRedux.push('/'))}> [routerRedux]go to home </button>
```

## 路由5：在model中跳转路由

```js
import { routerRedux } from 'dva/router';
// 这里put相当于dispatch
yield put(routerRedux.push('/'));

// 如果路由带参数 可以这样做
yield put(routerRedux.push({
  pathname: '/',
  search: queryString.stringify({ name: 'jerry', age: 18 }),
}));
```

## fetch

```js
effects: {
  *fetch(_, { put, call }) {  // eslint-disable-line
    yield put({ type: 'fetch/start' });
    try {
      const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
      yield put({ type: 'fetch/success', payload: { users: response.data } });
    } catch (error) {
      yield put({ type: 'fetch/error', payload: { error: error.message } });
    }
  }
},
```

## dva middleware

```js
const logger = store => next => action => {
  console.log('dispatching ', action);
  const result = next(action);
  console.log('next state ', store.getState());
  return result;
}

const error = store => next => action => {
  try {
    console.log('error: null');
    next(action);
  } catch (error) {
    console.info('[dva middleware: error]');
    console.error(error);
  }
}
```

## extraReducers

> 全局添加reducer

```js
const extraReducers {
  //  form = namespace
  form(state = false, action) {
    switch (action.type) {
      case 'SHOW':
        return true;
      case 'HIDE'
        return false;
      default:
        return state;
    }
  }
}

const app = dva({
  history: createHistory(),
  onAction: [ logger, error ],
  extraReducers
});
```

## onEffect

```js
const onEffect = (effect, { put }, model, key) => {
  return function*(...args) {
    // model = 具体哪个model
    console.log('*********onEffect, model', model);
    // key = 具体的action名
    console.log('*********onEffect, key', key);

    yield put({ type: 'SHOW' });
    yield effect(...args);
    yield put({ type: 'HIDE' });
  }
}

const app = dva({
  history: createHistory(),
  onAction: [ logger, error ],
  extraReducers,
  onEffect,
});
```
