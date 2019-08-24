import React from 'react';
import propTypes from 'prop-types';

const Counter = ({ counter, dispatch }) => {
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
    </div>
  );
};

Counter.propTypes = {
  counter: propTypes.object,
};



export default Counter;
