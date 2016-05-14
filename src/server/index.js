import config from 'shared/configs';

import express from 'express';

import jsonServer from 'json-server';
import mockData from 'server/mockData';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import serverRendering from 'server/renderer';
import routeHandlers from 'server/routes';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const jsonServerRouter = jsonServer.router(mockData());

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routeHandlers);
app.use('/api', jsonServer.defaults());
app.use('/api', jsonServerRouter);

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