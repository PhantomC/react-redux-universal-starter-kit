import * as actionTypes from 'shared/modules/article/actionTypes';

export default function(state = [], action) {
  switch (action.type) {

    case `${actionTypes.ARTICLE_GET_LATEST}_SUCCESS`:
    case `${actionTypes.ARTICLE_GET_SEARCH_RESULTS}_SUCCESS`:
      return action.data || state;

    case actionTypes.ARTICLE_DELETE_BY_ID:
      return state.filter(article => {
        return article.id !== action.id;
      });

    case `${actionTypes.ARTICLE_CREATE}_SUCCESS`:
      return [
        action.data,
        ...state
      ];

    default:
      return state;
  }
}