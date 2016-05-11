import u from 'updeep';

import * as actionTypes from 'shared/redux/constants/actionTypes';

const initialState = {
  error: false,
  data: {},
  related: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case actionTypes.ARTICLE_GET_BY_ID:
      return u({
        data: action.data,
        error: false
      }, initialState);
    case `${actionTypes.ARTICLE_GET_BY_ID}_FAIL`:
      return u({
        error: action.error
      }, initialState);
    case actionTypes.ARTICLE_GET_RELATED_ARTICLES:
      return u({
        related: action.data
      }, state);
    case actionTypes.ARTICLE_GET_LATEST:
      return initialState;
    default:
      return state;
  }
}