import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from 'shared/system/reducers';
import authenticationMiddleware from 'shared/modules/member/authenticationMiddleware';
import DevTools from 'shared/components/DevTools';

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
    module.hot.accept('shared/system/reducers', () => {
      const nextRootReducer = require('shared/system/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}