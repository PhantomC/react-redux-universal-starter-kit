import u from 'updeep';

import { 
  ARTICLE_GET_LATEST, 
  ARTICLE_GET_BY_ID,
  ARTICLE_GET_RELATED_ARTICLES
} from 'shared/constants/actionTypes';

const initialState = {
  error: false,
  data: {},
  related: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ARTICLE_GET_BY_ID:
      return u({
        data: action.data,
        error: false
      }, initialState);
    case `${ARTICLE_GET_BY_ID}_FAIL`:
      return u({
        error: action.error
      }, initialState);
    case ARTICLE_GET_RELATED_ARTICLES:
      return u({
        related: action.data
      }, state);
    case ARTICLE_GET_LATEST:
      return initialState;
    default:
      return state;
  }
}