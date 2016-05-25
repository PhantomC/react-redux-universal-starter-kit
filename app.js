require('babel-register');
require("babel-polyfill");

require('css-modules-require-hook')({
  extensions: ['.css', '.scss'],
 	generateScopedName: '[name]__[local]___[hash:base64:5]'
});
require('./src/server');