import { combineReducers } from 'redux';

import memberReducer from './memberReducer';
import articleLatestReducer from './articleLatestReducer';
import articleActiveReducer from './articleActiveReducer';

const rootReducer = combineReducers({
	member: memberReducer,
	articleLatest: articleLatestReducer,
	articleActive: articleActiveReducer,
});


export default rootReducer;