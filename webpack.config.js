var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'cheap-module-eval-source-map',
    
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'src/client.js')
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react-hmre'],
                }
            }
        ]
    }
};