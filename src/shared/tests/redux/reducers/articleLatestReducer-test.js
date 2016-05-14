import { expect } from 'chai';

import * as actionTypes from 'shared/redux/constants/actionTypes';
import articleLatestReducer from 'shared/redux/reducers/articleReducer/articleLatestReducer';

describe('Article Latest Reducer', () => {
  
  describe('When app starts', () => {
    it('Should return the initial state', () => {
      const state = articleLatestReducer(undefined, {});
      expect(state).to.eql([]);
    });
  });

  describe('When receive some new articles', () => {
    it('Should add that articles in the list', () => {
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
        type: actionTypes.ARTICLE_GET_LATEST,
        data
      });
      expect(state).to.eql(data);
    });
  });

  describe('When delete an article', () => {
    it('Should delete the article from the list', () => {
      const id = 1;
      const initialState = [{id}];
      const state = articleLatestReducer(initialState, {
        type: actionTypes.ARTICLE_DELETE_BY_ID,
        id
      });
      expect(state).to.eql([]);
    });
  });

});