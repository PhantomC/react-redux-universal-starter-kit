import { CONTACT_SAVE } from 'shared/redux/constants/actionTypes';

export function saveContactFormData(data) {
  return {
    type: CONTACT_SAVE,
    request: {
      path: '/contact',
      options: {
        method: 'POST',
        body: data
      }
    }
  };
}
