import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'shared/redux/reducers';
import apiMiddleware from 'shared/redux/middlewares/apiMiddleware';
import authenticationMiddleware from 'shared/redux/middlewares/authenticationMiddleware';
import DevTools from 'shared/components/partials/DevTools';

const enhancer = compose(
  applyMiddleware(apiMiddleware, authenticationMiddleware),
  DevTools.instrument()
);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('shared/redux/reducers', () =>
      store.replaceReducer(require('shared/redux/reducers'))
    );
  }

  return store;
}