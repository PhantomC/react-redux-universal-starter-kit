import { expect } from 'chai';

import * as performanceActions from '../../src/actions/performanceActions';

describe('Performance actions', () => {

	describe('Delete Article', () => {
		let action;
		let id = 1;

		beforeEach(() => {
			action = performanceActions.deleteArticle(id);
		});

		it('should have the correct type', () => {
	    	expect(action.type).to.equal('DELETE_ARTICLE');
	  	});

	  	it('should have the correct payload', () => {
	    	expect(action.id).to.equal(id);
	  	});
	});
	
});