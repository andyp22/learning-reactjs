var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader?name=/images/[name].[ext]"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                importLoaders: 2,
                localIdentName: '[hash:base64:5]',
                discardComments: {
                  removeAll: true
                }
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css?$/,
        //loader: ExtractTextPlugin.extract({
          //fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                discardComments: {
                  removeAll: true
                }
              }
            }
          ]
        //})
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin({
        filename: 'css/styles.css',
        allChunks: true
      })
  ],
  // Where to resolve our loaders
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
    moduleExtensions: ['-loader'],
  },
  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    // Extensions used to resolve modules
    extensions: [ '.ts', '.tsx', '.js', '.scss', '.css']
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 9000
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
};
