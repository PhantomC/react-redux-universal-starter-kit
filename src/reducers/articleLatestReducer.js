export default function(state = [], action) {
	switch(action.type) {
		case 'GET_ARTICLE_LATEST':
		case 'GET_SEARCH_RESULTS':
			return action.data || state;
		case 'DELETE_ARTICLE':
			return state.filter(function(article) {
				return article.id !== action.id;
			})
		default:
			return state;
	}
}