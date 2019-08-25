import { delay } from 'dva/saga';
import { routerRedux } from 'dva/router';
import queryString from 'querystring';

export default {

  namespace: 'counter',

  state: { count: 1 },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      console.log('[subscriptions]~~dispatch~~', dispatch);
      console.log('[subscriptions]~~history~~', history);
      window.onresize = () => {
        dispatch({type: 'add', payload: 2});
      }
    },
  },


  effects: {
    *asyncAdd({ payload }, { put, call, push }) {  // eslint-disable-line
      // const { counter } = yield select(_ => _);
      yield call(delay, 1000);
      yield put({ type: 'add', payload });
      yield call(delay, 1000);
      // yield put(routerRedux.push('/'));
      yield put(routerRedux.push({
        pathname: '/',
        search: queryString.stringify({ name: 'jerry', age: 18 }),
      }));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    add(state, action) {
      return { ...state, count: state.count + action.payload };
    },
  },
};
