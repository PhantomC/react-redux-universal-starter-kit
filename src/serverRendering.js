import React from 'react';
import ReactDOM from 'react-dom/server';

import { match, RouterContext } from 'react-router';
import routes from './routes';

import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';

import { Provider } from 'react-redux';

import prefetchComponentData from './utils/prefetchComponentData';

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
    
    prefetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => res.status(200).end(renderHTML()))
      .catch(err => res.end(err.message));
    
    function renderHTML() {
      
      const renderedComponent = ReactDOM.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
      
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

  });  
};