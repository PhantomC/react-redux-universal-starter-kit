import { expect } from 'chai';
import reactCookie from 'react-cookie';
import { AUTH_TOKEN } from 'shared/redux/constants/cookieNames';

import * as actionTypes from 'shared/redux/constants/actionTypes';
import * as articleActions from 'shared/redux/actions/articleActions';

describe('Article Actions', () => {
	
	describe('getArticleLatest', () => {

		let testedAction = {};
		const limit = 5;

		before(() => {
			testedAction = articleActions.getArticleLatest(limit);
		});

		it('should have the correct type', () => {
			expect(testedAction.type).to.eql(actionTypes.ARTICLE_GET_LATEST); 
		});

		it('should have the correct payload', () => {
			expect(testedAction.request.path).to.eql(`/articles?_expand=member&_sort=id&_order=DESC&_limit=${limit}`);
		});
	});

	describe('createNewArticle', () => {
		
		let testedAction = {};

		const data = {
			title: 'Test Title',
			excerpt: 'Test excerpt',
			body: 'Test body',
			tags: ['tag1', 'tag2']
		};

		const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlN1cmFuYXJ0IE5pYW1jb21lIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL3VpZmFjZXMvZmFjZXMvdHdpdHRlci9hbHhsZXJveWRldmFsLzEyOC5qcGciLCJpYXQiOjE0NjM1NzU2MzV9.LGzmruJdmt-1w5PdKIh1XOSeXZWU7TznGH1vsodJpus';

		before(() => {
			reactCookie.save(AUTH_TOKEN, token);
			testedAction = articleActions.createNewArticle(data);
		});

		it('should have the correct type', () => {
			expect(testedAction.type).to.eql(actionTypes.ARTICLE_CREATE); 
		});

		describe('should have the correct payload', () => {
			it('should have the correct path', () => {
				expect(testedAction.request.path).to.eql('/articles'); 
			});
			it('should have the POST method', () => {
				expect(testedAction.request.options.method).to.eql('POST'); 
			});
			it('should have the correct body', () => {
				expect(testedAction.request.options.body).to.contains(data); 
			});
		});
	});
	
});