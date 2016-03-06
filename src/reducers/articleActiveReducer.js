const initialState = {};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_ARTICLE_BY_ID':
			return action.data || state;
		case 'GET_ARTICLE_LATEST':
			return initialState;
		default:
			return state;
	}
}