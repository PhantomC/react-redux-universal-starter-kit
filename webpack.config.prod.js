var path = require('path');
var webpack = require('webpack');

var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');

module.exports = {

    devtool: 'source-map',
    
    entry: path.join(__dirname, 'src/client.js'),

    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'build')
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:4]!postcss`),
                exclude: /node_modules/
            }, {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new AssetsPlugin({
            filename: 'assets.json',
            path: 'build'
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ],

    postcss: [
        nested(),
        autoprefixer()
    ]
};