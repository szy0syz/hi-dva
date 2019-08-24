import React from 'react';
import { connect } from 'dva';
import Counter from '../components/Counter';

import styles from './CounterPage.css';

function CounterPage({ counter, dispatch }) {
  return (
    <div className={styles.normal}>
      <Counter counter={counter} dispatch={dispatch} />
    </div>
  );
}

CounterPage.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

export default connect(mapStateToProps)(CounterPage);
