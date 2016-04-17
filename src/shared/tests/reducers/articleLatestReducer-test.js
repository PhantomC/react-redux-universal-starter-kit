import { expect } from 'chai';

import { ARTICLE_GET_LATEST, ARTICLE_DELETE_BY_ID } from '../../constants/actionTypes';
import articleLatestReducer from '../../redux/reducers/articleLatestReducer';

describe('Article Latest Reducer', () => {
  
  describe('Delete Article', () => {

    it('Should return the initial state', () => {
      const state = articleLatestReducer(undefined, {});
      expect(state).to.eql([]);
    });

    it('Should add the latest article', () => {
      const data = [
        {
          id: 1,
          title: 'Title 1'
        }, {
          id: 2,
          title: 'Title 2'
        }
      ];
      const state = articleLatestReducer(undefined, {
        type: ARTICLE_GET_LATEST,
        data
      });
      expect(state).to.eql(data);
    });

    it('Should delete the article', () => {
      const id = 1;
      const initialState = [{id}];
      const state = articleLatestReducer(initialState, {
        type: ARTICLE_DELETE_BY_ID,
        id
      });
      expect(state).to.eql([]);
    });
  });

});