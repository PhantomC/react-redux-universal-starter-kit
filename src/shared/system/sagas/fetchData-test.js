import { expect } from 'chai';
import { take, call, put } from 'redux-saga/effects';

import { fetchData } from 'shared/system/sagas/fetchData';
import requestAPI from 'shared/system/utils/request';

import * as articleActions from 'shared/modules/article/articleActions';

describe('Fetch Data Saga', () => {

  const mockAction = articleActions.getArticleContentById(1);
  let generator = {};

  beforeEach(() => {
    generator = fetchData(mockAction);
    expect(generator.next().value).to.eql(call(requestAPI, mockAction.request.path, mockAction.request.options));
  });

  describe('If it requests the data successfully', () => {
    const response = {
      data: {
        id: '1',
        tags: ['tag1', 'tag2']
      }
    };

    it('should dispatch the success action', () => {
      expect(generator.next(response).value).to.eql(put({
        type: `${mockAction.type}_SUCCESS`,
        data: response.data
      }));
    });

    it('should dispatch the callback if it present', () => {
      expect(generator.next(response).value).to.eql(put({
        type: `${mockAction.type}_SUCCESS`,
        data: response.data
      }));

      expect(generator.next().value).to.eql(call(fetchData, mockAction.callback(response.data)));
    });

  });

  it('should dispatch the failed action if the response errors', () => {
    const response = {
      error: 'Some error',
    };
    expect(generator.next(response).value).to.eql(put({
      type: `${mockAction.type}_FAILED`,
      error: response.error
    }));
  });

});