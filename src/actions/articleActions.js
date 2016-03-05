export function getArticleLatest() {
	return {
		type: 'GET_ARTICLE_LATEST',
		promise: fetch('http://localhost:3004/articles')
	}
}

export function getSearchResults(keyword) {
	return {
		type: 'GET_SEARCH_RESULTS',
		promise: fetch(`http://localhost:3004/articles?q=${keyword}`)
	}
}

export function getArticleById(id) {
	return {
		type: 'GET_ARTICLE_BY_ID',
		promise: fetch(`http://localhost:3004/articles/${id}`)
	}
}
