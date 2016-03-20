const initialData = {};
const initialRelated = [];

const initialState = {
	error: false,
	data: initialData,
	related: initialRelated
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_ARTICLE_BY_ID':
			if (action.error) {
				return {
					...initialState,
					error: action.error
				};
			}
			return {
				...initialState,
				data: action.data,
				error: false
			};
		case 'GET_ARTICLE_RELATED':
			return {
				...state,
				related: action.data
			};
		case 'GET_ARTICLE_LATEST':
			return initialState;
		default:
			return state;
	}
}