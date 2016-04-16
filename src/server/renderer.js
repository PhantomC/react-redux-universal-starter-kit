import React from 'react';
import ReactDOM from 'react-dom/server';

import Helmet from 'react-helmet';

import { match, RouterContext } from 'react-router';
import getRoutes from '../shared/routes';

import prefetchComponentData from '../shared/utils/prefetchComponentData';

import { Provider } from 'react-redux';

import createStore from '../shared/redux/store/createStore';

export default function(req, res) {

  const store = createStore();

  match({ routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).end(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps) {
      const routeStatus = renderProps.routes.reduce((prev, cur) => cur.status || prev, null);
      if (routeStatus) {
        res.status(routeStatus);
      }

      prefetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => res.end(renderHTML()))
        .catch(err => res.end(err.message));
    }

    function renderHTML() {

      const renderedComponent = ReactDOM.renderToString(
        <Provider store={ store }>
          <RouterContext {...renderProps } /> 
        </Provider>
      );

      const initialState = store.getState();

      let head = Helmet.rewind();

      const assets = require('../../static/build/assets.json');

      const HTML = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${head.title.toString()}
            ${head.meta.toString()}
            <link rel="stylesheet" href="${assets.main.css}" />
            ${head.link.toString()}
          </head>
          <body>
            <div id="app">${renderedComponent}</div>
            <script type="application/javascript">
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
            <script src="${assets.main.js}"></script>
          </body>
        </html>    
      `;

      return HTML;
    }

  });
};