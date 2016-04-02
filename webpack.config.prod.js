var path = require('path');
var webpack = require('webpack');

var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

module.exports = {

    devtool: 'source-map',
    
    entry: path.join(__dirname, 'src/client.js'),

    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'static', 'build'),
        chunkFilename: "[name].[chunkhash].js",
        publicPath: "/build/"
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss`),
                exclude: /node_modules/
            }, {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'HOSTNAME': JSON.stringify(process.env.HOSTNAME),
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
        precss(),
        cssnano()
    ]
};