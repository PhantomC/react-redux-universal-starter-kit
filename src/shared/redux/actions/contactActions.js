import { CONTACT_SAVE } from 'shared/constants/actionTypes';

export function saveContactFormData(data) {
  return {
    type: CONTACT_SAVE,
    request: {
      path: '/contact',
      options: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    }
  };
}
