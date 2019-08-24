import { delay } from 'dva/saga';

export default {

  namespace: 'counter',

  state: { count: 1 },

  effects: {
    *asyncAdd({ payload }, { put, call }) {  // eslint-disable-line
      yield call(delay, 1000);
      yield put({ type: 'add', payload });
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
