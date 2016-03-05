export default function(state = {}, action) {
	switch(action.type) {
		case 'GET_ARTICLE_BY_ID':
			return action.data || state;
		default:
			return state;
	}
}