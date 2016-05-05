require('babel-register');

require('css-modules-require-hook')({
  extensions: ['.scss'],
 	generateScopedName: '[name]__[local]___[hash:base64:5]'
});
require('./src/server');