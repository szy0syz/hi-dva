import React from 'react';
import propTypes from 'prop-types';
import { withRouter, Link, routerRedux } from 'dva/router';

const Counter = ({ counter, dispatch, history }, context) => {
  console.log(context);
  const handleClick = () => {
    dispatch({type: 'counter/add', payload: 3})
  }

  const handleClickAsync = () => {

    dispatch({type: 'counter/asyncAdd', payload: 5})
  }

  return (
    <div>
      <h1>Counter</h1>
      <h2>{ counter.count }</h2>
      <button onClick={handleClick}> + </button>
      <button onClick={handleClickAsync}> async + </button>
      <button onClick={() => history.push('/')}> go to home </button>
      <button onClick={() => context.router.history.push('/')}> [context]go to home </button>
      <button onClick={() => dispatch(routerRedux.push('/'))}> [routerRedux]go to home </button>
      <Link to='/'>home page</Link>
    </div>
  );
};

Counter.propTypes = {
  counter: propTypes.object,
};

Counter.contextTypes = {
  router: propTypes.object,
};



export default withRouter(Counter);
