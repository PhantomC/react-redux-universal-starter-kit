import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import promiseResolver from '../middlewares/promiseResolver';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import DevTools from '../../components/partials/DevTools';

const enhancer = compose(
  applyMiddleware(promiseResolver, authenticationMiddleware),
  DevTools.instrument()
);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}