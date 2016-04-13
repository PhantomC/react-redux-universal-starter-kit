import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ArticleList from '../../src/components/ArticleList';
import Article from '../../src/components/Article';

describe('Article List', () => {
	it('should render the correct count of articles', () => {
    const articles = [
      {
        id: '1',
        title: 'Title 1'    
      }, {
        id: '2',
        title: 'Title 2'    
      }
    ];
    const list = shallow(<ArticleList articles={articles} />)
    const items = list.find(Article);
    expect(items).to.have.length.of(2);	
	});
});