require('es6-promise').polyfill();
require('isomorphic-fetch');

const apiHost = process.env.APIHOST || 'localhost';
const apiPort = process.env.APIPORT || '3004';

export function getArticleLatest() {
	return {
		type: 'GET_ARTICLE_LATEST',
		promise: fetch(`http://${apiHost}:${apiPort}/articles`)
	}
}

export function getSearchResults(keyword) {
	return {
		type: 'GET_SEARCH_RESULTS',
		promise: fetch(`http://${apiHost}:${apiPort}/articles?q=${keyword}`)
	}
}

export function getArticleById(id) {
	return {
		type: 'GET_ARTICLE_BY_ID',
		promise: fetch(`http://${apiHost}:${apiPort}/articles/${id}`)
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