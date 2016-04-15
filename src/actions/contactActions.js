export function saveContactFormData(data) {
  return {
    type: 'SAVE_CONTACT_FORM_DATA',
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
