require('babel-register');
require("babel-polyfill");

require('css-modules-require-hook')({
 	generateScopedName: (process.env.NODE_ENV === 'production' ? '' : '[path]___') + '[name]__[local]___[hash:base64:5]'
});
require('./src/server');