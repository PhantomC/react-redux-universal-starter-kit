import { 
  ARTICLE_GET_LATEST, 
  ARTICLE_GET_SEARCH_RESULTS,
  ARTICLE_DELETE_BY_ID,
  ARTICLE_CREATE
} from 'shared/constants/actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case ARTICLE_GET_LATEST:
    case ARTICLE_GET_SEARCH_RESULTS:
      return action.data || state;
    case ARTICLE_DELETE_BY_ID:
      return state.filter(article => {
        return article.id !== action.id;
      });
    case ARTICLE_CREATE:
      return [
        action.data,
        ...state
      ];
    default:
      return state;
  }
}