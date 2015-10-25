var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ],
    resolve: {
      extensions: ['', '.js', '.styl']
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};