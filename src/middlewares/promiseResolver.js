export default function promiseMiddleware() {
    return next => action => {
        const { promise, type, ...rest } = action;

        if (!promise) return next(action);

        const DONE = type;
        const REQUEST = type + '_REQUEST';
        next({...rest, type: REQUEST });

        return promise
            .then(function(response) {
                if (response.status >= 400) {
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (!data) {
                    next({...rest, type: DONE, error: 'Error 404 - Not Found'});
                    return false;
                }
                next({...rest, type: DONE, data});
                return true;
            });
    };
}