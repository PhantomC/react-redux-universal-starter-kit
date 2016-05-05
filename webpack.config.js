var path = require('path');
var webpack = require('webpack');

var AssetsPlugin = require('assets-webpack-plugin');

var autoprefixer = require('autoprefixer');

module.exports = {

  devtool: 'inline-source-map',
  
  entry: [
    'webpack-hot-middleware/client',
    'bootstrap-loader',
    path.join(__dirname, 'src/client.js')
  ],
  
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'static', 'build'),
    publicPath: '/build/',
    chunkFilename: "[name].js"
  },
  
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        }
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'
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
        'NODE_ENV': JSON.stringify('development'),
        'BROWSER': true
      }       
    }),
    new webpack.HotModuleReplacementPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'static', 'build'),
      prettyPrint: true
    })
  ],

  postcss: [ 
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};