import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';

import requestAPI from 'shared/utils/request';

import * as actionTypes from 'shared/redux/constants/actionTypes';

import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/redux/constants/cookieNames';

export function* fetchData(action) {

  const { type, request, callback } = action;

  const { data, error } = yield call(requestAPI, request.path, request.options);

  if (data) {
    yield put({
      type: `${type}_SUCCESS`,
      data
    });
    if (callback) {
      const action = callback(data);
      yield call(fetchData, action);
    }
  } else {
    yield put({
      type: `${type}_FAILED`,
      error
    });
  }
}

function* watchGetArticleLatest() {
  yield* takeEvery(actionTypes.ARTICLE_GET_LATEST, fetchData);
}

function* watchGetSearchResults() {
  yield* takeEvery(actionTypes.ARTICLE_GET_SEARCH_RESULTS, fetchData);
}

function* watchGetArticleById() {
  yield* takeEvery(actionTypes.ARTICLE_GET_BY_ID, fetchData);
}

function* watchGetRelatedArticles() {
  yield* takeEvery(actionTypes.ARTICLE_GET_RELATED_ARTICLES, fetchData);
}

function* watchCreateNewArticle() {
  yield* takeEvery(actionTypes.ARTICLE_CREATE, fetchData);
}

function* watchSaveContactFormData() {
  yield* takeEvery(actionTypes.CONTACT_SAVE, fetchData);
}

function* watchMemberLogin() {
  yield* takeEvery(actionTypes.MEMBER_LOGIN, fetchData);
}

function* watchMemberGetMyArticles() {
  yield* takeEvery(actionTypes.MEMBER_GET_MY_ARTICLES, fetchData);
}

export default function* rootSaga() {
  yield [
    watchGetArticleLatest(),
    watchGetSearchResults(),
    watchGetArticleById(),
    watchGetRelatedArticles(),
    watchCreateNewArticle(),
    watchSaveContactFormData(),
    watchMemberLogin(),
    watchMemberGetMyArticles()
  ]
}