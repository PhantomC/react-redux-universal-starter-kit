import { expect } from 'chai';

import configureMockStore from 'redux-mock-store';
import nock from 'nock';

import promiseResolver, { apiURL } from '../../src/middlewares/promiseResolver';
import * as articleActions from '../../src/actions/articleActions';

const middlewares = [promiseResolver];
const mockStore = configureMockStore(middlewares);

describe('Promise Resolver Middleware', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch correct action type and payload', (done) => {
    
    const store = mockStore({});
    const mockAction = articleActions.getArticleLatest(20);
    
    const expectedPayload = [
      { 
        id: 1,
        title: 'Title 1'
      }
    ];
    const expectedActions = [
      { 
        type: 'GET_ARTICLE_LATEST_REQUEST' 
      }, { 
        type: 'GET_ARTICLE_LATEST', 
        data: expectedPayload
      }
    ];

    nock(apiURL)
      .get(mockAction.request.path)
      .reply(200, expectedPayload);

    store.dispatch(mockAction)
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
      .then(done)
      .catch(done);
    
  });

  it('should dispatch the callback action if it present', (done) => {
    
    const store = mockStore({});
    const mockAction = articleActions.getArticleContentById(1);

    const expectedPayload = { 
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
      tags: ['react']
    } 
    const expectedActions = [
      { 
        type: 'GET_ARTICLE_BY_ID_REQUEST' 
      }, { 
        type: 'GET_ARTICLE_BY_ID', 
        data: expectedPayload
      }, { 
        type: 'GET_ARTICLE_RELATED_REQUEST', 
      }, { 
        type: 'GET_ARTICLE_RELATED', 
        data: [expectedPayload]
      }
    ];

    nock(apiURL)
      .get(mockAction.request.path)
      .reply(200, expectedPayload);

    nock(apiURL)
      .get(mockAction.callback(expectedPayload).request.path)
      .reply(200, [expectedPayload]);

    store.dispatch(mockAction)
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
      .then(done)
      .catch(done);
    
  });

});