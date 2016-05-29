import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';

import requestAPI from 'shared/system/utils/request';

import * as articleActionTypes from 'shared/modules/article/actionTypes';
import * as userActionTypes from 'shared/modules/member/actionTypes';
import * as contactActionTypes from 'shared/modules/contact/actionTypes';

import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/system/constants';

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
  yield* takeEvery(articleActionTypes.ARTICLE_GET_LATEST, fetchData);
}

function* watchGetSearchResults() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_SEARCH_RESULTS, fetchData);
}

function* watchGetArticleById() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_BY_ID, fetchData);
}

function* watchGetRelatedArticles() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_RELATED_ARTICLES, fetchData);
}

function* watchCreateNewArticle() {
  yield* takeEvery(articleActionTypes.ARTICLE_CREATE, fetchData);
}

function* watchSaveContactFormData() {
  yield* takeEvery(contactActionTypes.CONTACT_SAVE, fetchData);
}

function* watchMemberLogin() {
  yield* takeEvery(userActionTypes.MEMBER_LOGIN, fetchData);
}

function* watchMemberGetMyArticles() {
  yield* takeEvery(userActionTypes.MEMBER_GET_MY_ARTICLES, fetchData);
}

function* watchEditArticle() {
  yield* takeEvery(articleActionTypes.ARTICLE_EDIT_BY_ID, fetchData);
}

function* watchDeleteArticle() {
  yield* takeEvery(articleActionTypes.ARTICLE_DELETE_BY_ID, fetchData);
}

function* watchUpdateArticleById() {
  yield* takeEvery(articleActionTypes.ARTICLE_UPDATE_BY_ID, fetchData);
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
    watchMemberGetMyArticles(),
    watchEditArticle(),
    watchDeleteArticle(),
    watchUpdateArticleById()
  ];
}