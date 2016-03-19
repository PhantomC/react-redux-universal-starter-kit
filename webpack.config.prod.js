var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'source-map',
    
    entry: path.join(__dirname, 'src/client.js'),

    output: {
        path: path.join(__dirname, 'static/dist'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
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
    ]
};