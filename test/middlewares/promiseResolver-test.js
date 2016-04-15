import { expect } from 'chai';
import nock from 'nock';

import { applyMiddleware } from 'redux';
import promiseResolver, { apiURL } from '../../src/middlewares/promiseResolver';
import * as articleActions from '../../src/actions/articleActions';

const middlewares = [promiseResolver];

function createMockStore(getState, expectedActions, onLastAction) {
  
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).to.eql(expectedAction);
        if (onLastAction && !expectedActions.length) {
          onLastAction();
        }
        return action;
      }
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

describe('Promise Resolver Middleware', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch correct action type and payload', (done) => {
    
    const testedAction = articleActions.getArticleLatest(20);

    const expectedPayload = [
      { 
        id: 1,
        title: 'Title 1'
      }
    ];

    nock(apiURL)
      .get(testedAction.request.path)
      .reply(200, expectedPayload);

    const expectedActions = [
      { 
        type: 'GET_ARTICLE_LATEST_REQUEST' 
      }, { 
        type: 'GET_ARTICLE_LATEST', 
        data: expectedPayload
      }
    ];

    const mockState = {};
    const mockStore = createMockStore(mockState, expectedActions, done);

    mockStore.dispatch(testedAction);

  });

});