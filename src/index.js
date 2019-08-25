import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory as createHistory } from 'history';

import './index.css';

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

const extraReducers = {
  form(state = false, action) {
    switch (action.type) {
      case 'SHOW':
        return true;
      case 'HIDE':
        return false;
      default:
        return state;
    }
  }
}

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

// 1. Initialize
const app = dva({
  history: createHistory(),
  onAction: [ logger, error ],
  extraReducers,
  onEffect,
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
require('./models').default.forEach(key => app.model(key.default));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
