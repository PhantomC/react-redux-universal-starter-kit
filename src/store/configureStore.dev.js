import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import promiseResolver from '../middlewares/promiseResolver';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  applyMiddleware(promiseResolver),
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