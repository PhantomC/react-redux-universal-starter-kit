import { expect } from 'chai';

import * as actionTypes from 'shared/redux/constants/actionTypes';
import memberReducer, { initialState } from 'shared/redux/reducers/memberReducer';

describe('Member Reducer', () => {

	it('should have initial state', () => {
		const state = memberReducer(undefined, {});
    expect(state).to.eql(initialState);
	});

  describe('Login', () => {
    it('should set auth flag to TRUE', () => {
      const testAction = {
        type: actionTypes.MEMBER_LOGIN,
        data: {
          user: {}
        }
      }
      const state = memberReducer(undefined, testAction);
      expect(state.isAuthenticated).to.be.true;
    });
  });

  describe('Logout', () => {
    it('should set auth flag to FALSE', () => {
      const testAction = {
        type: actionTypes.MEMBER_LOGOUT
      }
      const state = memberReducer(undefined, testAction);
      expect(state.isAuthenticated).not.to.be.true;
    });
  });

});
