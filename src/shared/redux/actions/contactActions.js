import * as actionTypes from 'shared/redux/constants/actionTypes';

export function saveContactFormData(data) {
  return {
    type: actionTypes.CONTACT_SAVE,
    request: {
      path: '/contact',
      options: {
        method: 'POST',
        body: data
      }
    }
  };
}
