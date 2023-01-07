const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
