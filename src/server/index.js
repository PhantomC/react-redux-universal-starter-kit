import express from 'express';
import jsonServer from 'json-server';
import mockData from './mockData';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import serverRendering from './renderer';
import routes from './routes';

import bodyParser from 'body-parser';

const app = express();
const router = jsonServer.router(mockData());

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/api', jsonServer.defaults());
app.use('/api/articles', function(req, res, next) {
  setTimeout(next, 50);
});
app.use('/api', router);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(serverRendering);

const PORT = process.env.PORT;
app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server listening on', PORT);
});