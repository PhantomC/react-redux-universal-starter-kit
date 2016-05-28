import * as actionTypes from 'shared/modules/contact/actionTypes';

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
