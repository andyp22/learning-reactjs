var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const cssLoader = {
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
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      // Source maps for JavaScript and Typescript files.
      // Added to bundle.js
      {
        enforce: 'pre',
        test: /\.(js|tsx?)$/,
        use: "source-map-loader"
      },
      // Loader for Typescript files.
      // Added to bundle.js
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Image loader, does not include SVGs which are assumed to be
      // strictly for cross browser font support.
      // Added to /images/filename.ext
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: "file-loader?name=/images/[name].[ext]"
      },
      // Font loader
      // Added to /fonts/filename.ext
      {
        test: /\.(eot|woff|ttf|svg)$/i,
        use: "file-loader?name=/fonts/[name].[ext]"
      },
      // SASS loader and extractor
      // Extracts as CSS to /css/styles.css
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            cssLoader,
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
      // CSS loader
      // Added to /css/styles.css
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            cssLoader
          ]
        })
      }
    ]
  },
  plugins: [
      // Extract CSS to /css/styles.css for better browser caching.
      new ExtractTextPlugin({
        filename: 'css/styles.css',
        allChunks: true
      }),
      // Copy files and directories, unmodified, to the distributable.
      new CopyWebpackPlugin(
        [
          { from: 'vendor', to: 'vendor'}
        ]
      )
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
  // Webpack-dev-server settings
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
