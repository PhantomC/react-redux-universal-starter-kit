import { takeEvery } from 'redux-saga';
import { fetchData } from 'shared/system/sagas/fetchData';

import * as articleActionTypes from 'shared/modules/article/actionTypes';

export function* watchGetArticleLatest() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_LATEST, fetchData);
}

export function* watchGetSearchResults() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_SEARCH_RESULTS, fetchData);
}

export function* watchGetArticleById() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_BY_ID, fetchData);
}

export function* watchGetRelatedArticles() {
  yield* takeEvery(articleActionTypes.ARTICLE_GET_RELATED_ARTICLES, fetchData);
}

export function* watchCreateNewArticle() {
  yield* takeEvery(articleActionTypes.ARTICLE_CREATE, fetchData);
}

export function* watchEditArticle() {
  yield* takeEvery(articleActionTypes.ARTICLE_EDIT_BY_ID, fetchData);
}

export function* watchDeleteArticle() {
  yield* takeEvery(articleActionTypes.ARTICLE_DELETE_BY_ID, fetchData);
}

export function* watchUpdateArticleById() {
  yield* takeEvery(articleActionTypes.ARTICLE_UPDATE_BY_ID, fetchData);
}