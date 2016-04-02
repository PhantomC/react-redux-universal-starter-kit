require('es6-promise').polyfill();
require('isomorphic-fetch');

const apiHost = process.env.APIHOST || 'localhost';
const apiPort = process.env.APIPORT || '3004';

export function saveContactFormData(data) {
    return {
        type: 'SAVE_CONTACT_FORM_DATA',
        promise: fetch(`http://${apiHost}:${apiPort}/contact`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}
