require('es6-promise').polyfill();
require('isomorphic-fetch');

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

export function getArticleContentById(id) {
	return {
		...getArticleById(id),

		onPromiseResolve: result => {
			return getRelatedArticles(result.tags[0], id);
		}
	}
}

export function getRelatedArticles(keyword) {
	return {
		...getSearchResults(keyword),
		type: 'GET_ARTICLE_RELATED'
	}
}