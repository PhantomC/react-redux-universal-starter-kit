import { combineReducers } from 'redux';

import articleLatestReducer from './articleLatestReducer';
import articleActiveReducer from './articleActiveReducer';

const articleReducer = combineReducers({
  latest: articleLatestReducer,
  active: articleActiveReducer,
});

export default articleReducer;