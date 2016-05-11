import * as actionTypes from 'shared/redux/constants/actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.ARTICLE_GET_LATEST:
    case actionTypes.ARTICLE_GET_SEARCH_RESULTS:
      return action.data || state;
    case actionTypes.ARTICLE_DELETE_BY_ID:
      return state.filter(article => {
        return article.id !== action.id;
      });
    case actionTypes.ARTICLE_CREATE:
      return [
        action.data,
        ...state
      ];
    default:
      return state;
  }
}