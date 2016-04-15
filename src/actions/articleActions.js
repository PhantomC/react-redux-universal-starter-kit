const apiURL = `${process.env.HOSTNAME || 'http://localhost'}${process.env.NODE_ENV === 'production' ? '' : ':' + (process.env.PORT || '3000')}/api`;

export function getArticleLatest(limit = 20) {
  return {
    type: 'GET_ARTICLE_LATEST',
    request: {
      url: `${apiURL}/articles?_limit=${limit}`
    }
  };
}

export function getSearchResults(keyword, limit = 20) {
  return {
    type: 'GET_SEARCH_RESULTS',
    request: {
      url: `${apiURL}/articles?q=${keyword}&_limit=${limit}`
    }
  };
}

export function getArticleById(id) {
  return {
    type: 'GET_ARTICLE_BY_ID',
    request: {
      url: `${apiURL}/articles/${id}`
    }
  };
}

export function getArticleContentById(id) {
  return {
    ...getArticleById(id),

    callback: result => {
      return getRelatedArticles(result.tags[0], id);
    }
  };
}

export function getRelatedArticles(keyword) {
  return {
    ...getSearchResults(keyword),
    type: 'GET_ARTICLE_RELATED'
  };
}