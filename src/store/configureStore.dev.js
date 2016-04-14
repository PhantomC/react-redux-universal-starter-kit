import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

import DevTools from '../containers/DevTools';

const enhancer = compose(
  applyMiddleware(
    createSagaMiddleware(rootSaga)
  ),
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