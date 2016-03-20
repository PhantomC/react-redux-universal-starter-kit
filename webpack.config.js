var path = require('path');
var webpack = require('webpack');

var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {

    devtool: 'cheap-module-eval-source-map',
    
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'src/client.js')
    ],
    
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/'
    },
    
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=[name]__[local]!postcss`),
                exclude: /node_modules/
            }, {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react-hmre'],
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }       
        }),
        new webpack.HotModuleReplacementPlugin(),
        new AssetsPlugin({
            filename: 'assets.json',
            path: 'build'
        }),
        new ExtractTextPlugin('[name].css')
    ],

    postcss: [ 
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss()
    ]
};