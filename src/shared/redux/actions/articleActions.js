import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/constants/cookieNames';

import { 
  ARTICLE_GET_LATEST, 
  ARTICLE_GET_SEARCH_RESULTS, 
  ARTICLE_GET_BY_ID,
  ARTICLE_GET_RELATED_ARTICLES,
  ARTICLE_CREATE
} from 'shared/constants/actionTypes';

export function getArticleLatest(limit = 20) {
  return {
    type: ARTICLE_GET_LATEST,
    request: {
      path: `/articles?_sort=id&_order=DESC&_limit=${limit}`
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

    callback: (response, dispatch) => {
      return dispatch(getRelatedArticles(response.tags[0]));
    }
  };
}

export function getRelatedArticles(keyword) {
  return {
    ...getSearchResults(keyword),
    type: ARTICLE_GET_RELATED_ARTICLES
  };
}

export function createNewArticle(data) {
  const token = reactCookie.load(AUTH_TOKEN);
  const user = jwt.decode(token);
  data = {
    ...data,
    excerpt: data.body,
    author: {
      name: user.name,
      avatar: user.avatar
    }
  }
  return {
    type: ARTICLE_CREATE,
    request: {
      path: '/articles',
      options: {
        method: 'POST',
        body: data
      }
    }
  };
}