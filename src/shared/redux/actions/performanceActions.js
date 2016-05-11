import * as actionTypes from 'shared/redux/constants/actionTypes';

export function deleteArticle(id) {
  return {
    type: actionTypes.ARTICLE_DELETE_BY_ID,
    id
  };
}