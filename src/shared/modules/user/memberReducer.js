import * as userActionTypes from 'shared/modules/user/actionTypes';
import * as articleActionTypes from 'shared/modules/article/actionTypes';

export const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
  myArticles: [],
  myArticleEdit: {}
};

export default function(state = initialState, action) {
  switch(action.type) {

    case `${userActionTypes.MEMBER_LOGIN}_SUCCESS`:
      return { 
        ...state, 
        isAuthenticated: true,
        error: null,
        user: action.data.user
      };

    case `${userActionTypes.MEMBER_LOGIN}_FAILED`:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error.response,
        user: {}
      };

    case userActionTypes.MEMBER_LOGOUT:
      return initialState;

    case `${userActionTypes.MEMBER_GET_MY_ARTICLES}_SUCCESS`:
      return {
        ...state,
        myArticles: action.data
      };

    case `${articleActionTypes.ARTICLE_EDIT_BY_ID}_SUCCESS`:
      return {
        ...state,
        myArticleEdit: action.data
      };

    case articleActionTypes.ARTICLE_DELETE_BY_ID:
      return {
        ...state,
        myArticles: state.myArticles.filter(article => {
          return article.id !== action.id;
        })
      };

    default:
      return state;
  }
}