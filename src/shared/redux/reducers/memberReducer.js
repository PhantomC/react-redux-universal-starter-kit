import * as actionTypes from 'shared/redux/constants/actionTypes';

export const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
  myArticles: [],
  myArticleEdit: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case `${actionTypes.MEMBER_LOGIN}_REQUEST`:
      return { 
        ...state,
        isAuthenticated: false, 
        user: {},
        error: null
      };

    case actionTypes.MEMBER_LOGIN:
      return { 
        ...state, 
        isAuthenticated: true,
        error: null,
        user: action.data.user
      };

    case `${actionTypes.MEMBER_LOGIN}_FAIL`:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error,
        user: {}
      };

    case actionTypes.MEMBER_LOGOUT:
      return initialState;

    case actionTypes.MEMBER_GET_MY_ARTICLES:
      return {
        ...state,
        myArticles: action.data
      };

    case actionTypes.ARTICLE_EDIT_BY_ID:
      return {
        ...state,
        myArticleEdit: action.data
      };

    case actionTypes.ARTICLE_DELETE_BY_ID:
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