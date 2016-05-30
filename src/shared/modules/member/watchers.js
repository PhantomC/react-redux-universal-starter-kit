import { takeEvery } from 'redux-saga';
import { fetchData } from 'shared/system/sagas/fetchData';

import * as memberActionTypes from 'shared/modules/member/actionTypes';

export function* watchMemberLogin() {
  yield* takeEvery(memberActionTypes.MEMBER_LOGIN, fetchData);
}

export function* watchMemberGetMyArticles() {
  yield* takeEvery(memberActionTypes.MEMBER_GET_MY_ARTICLES, fetchData);
}
