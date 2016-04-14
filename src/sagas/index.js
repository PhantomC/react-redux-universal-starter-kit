require('es6-promise').polyfill();
require('isomorphic-fetch');

import { take, put, call, fork, select } from 'redux-saga/effects';
import * as articleActions from '../actions/articleActions';

function fetchApi(request) {
  return fetch(request).then(response => response.json());
}

function* fetchArticle(request, type, onPromiseResolve = null) {
  yield put({
    type: `${type}_REQUEST`
  });
  const data = yield call(fetchApi, request);
  yield put({
    type,
    data
  });
  if (onPromiseResolve) {
    const { type, request } = onPromiseResolve(data);
    yield call(fetchArticle, request, type);
  }
}

function* watchGetArticleLatest() {
  while(true) {
    const { type, request } = yield take('GET_ARTICLE_LATEST');
    yield call(fetchArticle, request, type);
  }
}

function* watchGetSearchResults() {
  while(true) {
    const { type, request } = yield take('GET_SEARCH_RESULTS');
    yield call(fetchArticle, request, type);
  }
}

function* watchGetArticleById() {
  while(true) {
    const { type, request, onPromiseResolve } = yield take('GET_ARTICLE_BY_ID');
    yield call(fetchArticle, request, type, onPromiseResolve);
  }
}

function* watchGetRelatedArticles() {
  while(true) {
    const { type, request } = yield take('GET_ARTICLE_RELATED');
    yield call(fetchArticle, request, type);
  }
}

export default function* root() {
  yield [
    fork(watchGetArticleLatest),
    fork(watchGetSearchResults),
    fork(watchGetArticleById),
    fork(watchGetRelatedArticles)
  ]
}