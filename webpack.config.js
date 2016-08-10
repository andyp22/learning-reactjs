
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var HtmlWebpackPluginCSSConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/styles/styles.css',
  filename: 'styles/styles.css',
  inject: 'body'
});

var HtmlWebpackPluginBootstrapConfig = new HtmlWebpackPlugin({
  template: __dirname + '/node_modules/bootstrap/dist/css/bootstrap.css',
  filename: 'styles/bootstrap.css',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js'
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [
    HtmlWebpackPluginConfig,
    HtmlWebpackPluginCSSConfig,
    HtmlWebpackPluginBootstrapConfig
  ]
};
