import React from 'react';
import { connect } from 'dva';

function UserPage({ user, dispatch, loading }) {
  console.log(loading)
  const { error, users } = user;
  let isFetching = loading.global;
  let message;

  if (error) {
    message = error;
  } else if (isFetching) {
    message = 'Loading...'
  } else {
    message = users && users.length || 0;
  }

  return (
    <div>
      <button onClick={() => dispatch({ type: 'user/fetch' })}>get user</button>
      <h2>users count: {message}</h2>
      {error ? (<h2>{error}</h2>): null}
      <ul>
        {users.map(item => (<li key={item.id}>{item.name} ({item.email})</li>))}
      </ul>
    </div>
  );
}

UserPage.propTypes = {};

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//   };
// };

export default connect(state => ({ user: state.user, loading: state.loading }))(UserPage);
