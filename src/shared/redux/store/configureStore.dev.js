import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from 'shared/redux/reducers';
import authenticationMiddleware from 'shared/redux/middlewares/authenticationMiddleware';
import DevTools from 'shared/components/partials/DevTools';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(
    sagaMiddleware, 
    authenticationMiddleware
  ),
  DevTools.instrument()
);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('shared/redux/reducers', () => {
      const nextRootReducer = require('shared/redux/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}