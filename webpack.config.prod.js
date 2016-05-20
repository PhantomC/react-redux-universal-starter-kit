var path = require('path');
var webpack = require('webpack');

var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

module.exports = {

  entry: [
    'bootstrap-loader',
    path.join(__dirname, 'src/client.js')
  ],

  output: {
    filename: '[name].[hash].js',
    chunkFilename: "[name].[chunkhash].js",
    path: path.join(__dirname, 'static', 'build'),
    publicPath: "/build/"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass!sass-resources')
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      }, {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },

  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BROWSER': true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'static', 'build'),
      prettyPrint: true
    }),
    new ExtractTextPlugin('[name].[hash].css', {
      allChunks: true
    })
  ],

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano()
  ],

  sassResources: [
    './src/shared/styles/variables.scss',
    './src/shared/styles/mixins.scss'
  ]

};
