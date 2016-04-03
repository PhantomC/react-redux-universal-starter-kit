import u from 'updeep';

const initialState = {
	error: false,
	data: {},
	related: []
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_ARTICLE_BY_ID':
			if (action.error) {
				return u({
					error: action.error
				}, initialState);
			}
			return u({
				data: action.data,
				error: false
			}, initialState);
		case 'GET_ARTICLE_RELATED':
			return u({
				related: action.data
			}, state);
		case 'GET_ARTICLE_LATEST':
			return initialState;
		default:
			return state;
	}
}