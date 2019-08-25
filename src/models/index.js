const context = require.context('./', false, /\.js$/);

// context is a Object
export default context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key));