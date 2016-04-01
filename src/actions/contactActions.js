require('es6-promise').polyfill();
require('isomorphic-fetch');

export function saveContactFormData(data) {
    return {
        type: 'SAVE_CONTACT_FORM_DATA',
        promise: fetch('http://localhost:3004/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}
