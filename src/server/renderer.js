import React from 'react';
import { renderToString } from 'react-dom/server';

import Helmet from 'react-helmet';
import reactCookie from 'react-cookie';

import { match, RouterContext } from 'react-router';
import getRoutes from 'shared/system/routes';

import { Provider } from 'react-redux';

import createStore from 'shared/system/store/createStore';
import rootSaga from 'shared/system/sagas';

import { MEMBER_LOAD_AUTH } from 'shared/modules/user/actionTypes';

export default function(req, res) {
  
  reactCookie.plugToRequest(req, res);
  const store = createStore();
  store.dispatch({
    type: MEMBER_LOAD_AUTH
  });

  match({ routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps && renderProps.components) {

      const routeStatus = renderProps.routes.reduce((prev, cur) => cur.status || prev, null);
      if (routeStatus) {
        res.status(routeStatus);
      }
      
      const rootComp = (
        <Provider store={ store }>
          <RouterContext {...renderProps } /> 
        </Provider>
      );

      store.runSaga(rootSaga).done.then(() => {
        const { HTML, status } = renderPage(
          renderToString(rootComp),
          store.getState()
        );
        if (!routeStatus) {
          res.status(status);
        }
        res.end(HTML);
      }).catch((e) => {
        console.log(e.message);
        res.status(500).send(e.message);
      });

      renderToString(rootComp);
      store.close();

    } else {
      res.status(404).send('Not found');
    }
  });
};

function renderPage(renderedComponent, initialState) {

  let status = 200;

  if (initialState.error !== null) {
    status = initialState.error.status;
  }

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
        ${assets.main.css ? '<link rel="stylesheet" href="' + assets.main.css + '" />' : ''}
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

  return {
    HTML,
    status
  };
}