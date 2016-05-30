import { put, call } from 'redux-saga/effects';

import requestAPI from 'shared/system/utils/request';
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