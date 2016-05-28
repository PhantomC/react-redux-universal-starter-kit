import { expect } from 'chai';

import * as actionTypes from 'shared/modules/article/actionTypes';
import * as articleActions from 'shared/modules/article/articleActions';

describe('Performance actions', () => {

  describe('Delete Article', () => {
    let action;
    let id = 1;

    beforeEach(() => {
      action = articleActions.deleteArticle(id);
    });

    it('should have the correct type', () => {
      expect(action.type).to.equal(actionTypes.ARTICLE_DELETE_BY_ID);
    });

    it('should have the correct payload', () => {
      expect(action.id).to.equal(id);
    });
  });
  
});