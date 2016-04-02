require('es6-promise').polyfill();
require('isomorphic-fetch');

const apiURL = `http://${process.env.HOSTNAME}${process.env.NODE_ENV === 'production' ? '' : ':' + process.env.PORT}/api`;

export function saveContactFormData(data) {
    return {
        type: 'SAVE_CONTACT_FORM_DATA',
        promise: fetch(`${apiURL}/contact`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}
