const initialState = {
	error: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_ARTICLE_BY_ID':
			if (action.error) {
				return { error: action.error };
			}
			return { ...initialState, ...action.data };
		default:
			return state;
	}
}