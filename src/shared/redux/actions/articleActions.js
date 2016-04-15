import { 
  ARTICLE_GET_LATEST, 
  ARTICLE_GET_SEARCH_RESULTS, 
  ARTICLE_GET_BY_ID,
  ARTICLE_GET_RELATED_ARTICLES
} from '../../constants/actionTypes';

export function getArticleLatest(limit = 20) {
  return {
    type: ARTICLE_GET_LATEST,
    request: {
      path: `/articles?_limit=${limit}`
    }
  };
}

export function getSearchResults(keyword, limit = 20) {
  return {
    type: ARTICLE_GET_SEARCH_RESULTS,
    request: {
      path: `/articles?q=${keyword}&_limit=${limit}`
    }
  };
}

export function getArticleById(id) {
  return {
    type: ARTICLE_GET_BY_ID,
    request: {
      path: `/articles/${id}`
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
    type: ARTICLE_GET_RELATED_ARTICLES
  };
}