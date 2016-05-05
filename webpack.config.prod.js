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
    path: path.join(__dirname, 'static', 'build'),
    chunkFilename: "[name].[chunkhash].js",
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
        loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=2&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss!sass`),
        exclude: /node_modules/
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      }, {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
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
  ]
};