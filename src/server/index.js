import config from 'shared/system/configs';

import express from 'express';

import jsonServer from 'json-server';
import mockData from 'server/mockData';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import serverRendering from 'server/renderer';
import routeHandlers from 'server/routes';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import passport from 'passport';
import passportRouteHandlers from 'server/routes/passport';
require('server/configs/passport/configurations')(passport);

const app = express();
const jsonServerRouteHandlers = jsonServer.router(mockData());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.session({ secret: 'suranart' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + 'static'));
app.use('/api', routeHandlers);

// json-server
app.use('/api', routeHandlers);
app.use('/api', jsonServer.defaults());
app.use('/api', jsonServerRouteHandlers);

app.use(passportRouteHandlers);

if (!config.isProduction) {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(serverRendering);

app.listen(config.port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server listening on', config.port);
});