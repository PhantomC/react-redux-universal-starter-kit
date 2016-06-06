import config from 'shared/system/configs';

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import jsonServer from 'json-server';
import mockData from 'server/mockData';

import routeHandlers from 'server/routes';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import serverRendering from 'server/renderer';

mongoose.connect('mongodb://localhost:project/members');

const app = express();
const jsonServerRouteHandlers = jsonServer.router(mockData());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static('static'));
app.use(routeHandlers);

// json-server
app.use('/api', jsonServer.defaults());
app.use('/api', jsonServerRouteHandlers);

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