import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'dva/router';

const Counter = ({ counter, dispatch, history }) => {
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
    </div>
  );
};

Counter.propTypes = {
  counter: propTypes.object,
};



export default withRouter(Counter);
