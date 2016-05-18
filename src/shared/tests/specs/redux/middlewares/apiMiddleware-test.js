import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';

import apiMiddleware, { apiURL } from 'shared/redux/middlewares/apiMiddleware';
import * as actionTypes from 'shared/redux/constants/actionTypes';
import * as articleActions from 'shared/redux/actions/articleActions';

const middlewares = [apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe('API Middleware', () => {

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
        type: `${actionTypes.ARTICLE_GET_LATEST}_REQUEST` 
      }, { 
        type: actionTypes.ARTICLE_GET_LATEST, 
        data: expectedPayload
      }
    ];

    nock(apiURL)
      .get(mockAction.request.path)
      .reply(200, expectedPayload);

    store.dispatch(mockAction)
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
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
    };
    const expectedActions = [
      { 
        type: `${actionTypes.ARTICLE_GET_BY_ID}_REQUEST` 
      }, { 
        type: actionTypes.ARTICLE_GET_BY_ID, 
        data: expectedPayload
      }, { 
        type: `${actionTypes.ARTICLE_GET_RELATED_ARTICLES}_REQUEST`, 
      }, { 
        type: actionTypes.ARTICLE_GET_RELATED_ARTICLES, 
        data: [expectedPayload]
      }
    ];

    nock(apiURL)
      .get(mockAction.request.path)
      .reply(200, expectedPayload);

    nock(apiURL)
    .get(articleActions.getRelatedArticles(expectedPayload.tags[0]).request.path)
      .reply(200, [expectedPayload]);

    store.dispatch(mockAction)
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .then(done)
      .catch(done);
    
  });

});