require('babel-register');
require('css-modules-require-hook')({
 	generateScopedName: '[name]__[local]' + (process.env.NODE_ENV === 'production' ? '-[hash:base64:4]' : '')
});
require('./src/server');
require('./api/server');