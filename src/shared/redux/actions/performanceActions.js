import { ARTICLE_DELETE_BY_ID } from 'shared/redux/constants/actionTypes';

export function deleteArticle(id) {
  return {
    type: ARTICLE_DELETE_BY_ID,
    id
  };
}