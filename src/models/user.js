import axios from 'axios';

export default {

  namespace: 'user',

  state: {
    isFetching: false,
    error: null,
    users: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

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

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    'fetch/start'(state) {
      return {
        ...state,
        isFetching: true,
        error: null,
        users: [],
      }
    },
    'fetch/success'(state, action) {
      return {
        ...state,
        isFetching: false,
        ...action.payload
      }
    },
    'fetch/error'(state, action) {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        users: []
      }
    }
  },
};
