import React from 'react';
import ReactDOM from 'react-dom/server';

import { match, RoutingContext } from 'react-router';
import routes from './routes';

import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';

import { Provider } from 'react-redux';

function renderHTML(renderedComponent) {
  const HTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Redux Universal Starter Kit</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
      </head>
      <body>
        <div id="app">${renderedComponent}</div>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>    
  `;
  return HTML;
}

export default function(req, res) {

  const store = createStore(rootReducer, applyMiddleware(promiseResolver));

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).end(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      res.status(404).end('Not found');
    }
    
    const renderedComponent = ReactDOM.renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );

    res.status(200).end(renderHTML(renderedComponent));
 
  });  
};