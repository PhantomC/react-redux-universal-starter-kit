import * as actionTypes from 'shared/modules/article/actionTypes';

const initialState = {
  data: {},
  related: []
};

export default function(state = initialState, action) {
  switch(action.type) {

    case actionTypes.ARTICLE_ACTIVE_RESET:
      return initialState;

    case `${actionTypes.ARTICLE_GET_BY_ID}_SUCCESS`:
      return {
        ...initialState,
        data: action.data
      }

    case `${actionTypes.ARTICLE_GET_RELATED_ARTICLES}_SUCCESS`:
      return {
        ...state,
        related: action.data
      }

    default:
      return state;
  }
}