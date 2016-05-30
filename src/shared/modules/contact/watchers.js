import { takeEvery } from 'redux-saga';
import { fetchData } from 'shared/system/sagas/fetchData';

import * as contactActionTypes from 'shared/modules/contact/actionTypes';

export function* watchSaveContactFormData() {
  yield* takeEvery(contactActionTypes.CONTACT_SAVE, fetchData);
}