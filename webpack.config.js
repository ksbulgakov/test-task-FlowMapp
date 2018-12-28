var path = require('path'); // eslint-disable-line

module.exports = {
  mode: 'development',
  entry: './dist/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'index.js',
  },
};
