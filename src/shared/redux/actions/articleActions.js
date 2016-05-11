import jwt from 'jsonwebtoken';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/redux/constants/cookieNames';

import * as actionTypes from 'shared/redux/constants/actionTypes';

export function getArticleLatest(limit = 20) {
  return {
    type: actionTypes.ARTICLE_GET_LATEST,
    request: {
      path: `/articles?_expand=member&_sort=id&_order=DESC&_limit=${limit}`
    }
  };
}

export function getSearchResults(keyword, limit = 20) {
  return {
    type: actionTypes.ARTICLE_GET_SEARCH_RESULTS,
    request: {
      path: `/articles?q=${keyword}&_expand=member&_sort=id&_order=DESC&_limit=${limit}`
    }
  };
}

export function getArticleById(id) {
  return {
    type: actionTypes.ARTICLE_GET_BY_ID,
    request: {
      path: `/articles/${id}?_expand=member`
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
    type: actionTypes.ARTICLE_GET_RELATED_ARTICLES
  };
}

export function createNewArticle(data) {
  const token = reactCookie.load(AUTH_TOKEN);
  const user = jwt.decode(token);
  data = {
    ...data,
    excerpt: data.body,
    memberId: user.id,
    member: user
  }
  return {
    type: actionTypes.ARTICLE_CREATE,
    request: {
      path: '/articles',
      options: {
        method: 'POST',
        body: data
      }
    }
  };
}
