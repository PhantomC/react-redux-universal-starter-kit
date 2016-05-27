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

    case `${actionTypes.MEMBER_LOGIN}_SUCCESS`:
      return { 
        ...state, 
        isAuthenticated: true,
        error: null,
        user: action.data.user
      };

    case `${actionTypes.MEMBER_LOGIN}_FAILED`:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error.response,
        user: {}
      };

    case actionTypes.MEMBER_LOGOUT:
      return initialState;

    case `${actionTypes.MEMBER_GET_MY_ARTICLES}_SUCCESS`:
      return {
        ...state,
        myArticles: action.data
      };

    case `${actionTypes.ARTICLE_EDIT_BY_ID}_SUCCESS`:
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