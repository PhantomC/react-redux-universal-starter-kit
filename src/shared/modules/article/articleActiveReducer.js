import u from 'updeep';

import * as actionTypes from 'shared/modules/article/actionTypes';

const initialState = {
  error: false,
  data: {},
  related: []
};

export default function(state = initialState, action) {
  switch(action.type) {

    case `${actionTypes.ARTICLE_GET_BY_ID}_SUCCESS`:
      return u({
        data: action.data,
        error: false
      }, initialState);

    case `${actionTypes.ARTICLE_GET_BY_ID}_FAILED`:
      return u({
        error: action.error.response
      }, initialState);

    case `${actionTypes.ARTICLE_GET_RELATED_ARTICLES}_SUCCESS`:
      return u({
        related: action.data
      }, state);

    case actionTypes.ARTICLE_GET_LATEST:
      return initialState;

    default:
      return state;
  }
}