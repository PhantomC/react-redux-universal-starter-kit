import { expect } from 'chai';

import articleLatestReducer from '../../src/reducers/articleLatestReducer';

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
        type: 'GET_ARTICLE_LATEST',
        data
      });
      expect(state).to.eql(data);
    });

    it('Should delete the article', () => {
      const id = 1;
      const initialState = [{id}];
      const state = articleLatestReducer(initialState, {
        type: 'DELETE_ARTICLE',
        id
      });
      expect(state).to.eql([]);
    });
  });

});