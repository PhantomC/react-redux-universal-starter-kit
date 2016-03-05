import { combineReducers } from 'redux';

import articleLatestReducer from './articleLatestReducer';
import articleActiveReducer from './articleActiveReducer';

const rootReducer = combineReducers({
	articleLatest: articleLatestReducer,
	articleActive: articleActiveReducer
});


export default rootReducer;