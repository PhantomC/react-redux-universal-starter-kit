import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ArticleList from '../../src/components/ArticleList';
import Article from '../../src/components/Article';

describe('Article List', () => {
	
  let articles = [];

  beforeEach(() => {
    articles = [
      {
        id: '1',
        title: 'Title 1'    
      }, {
        id: '2',
        title: 'Title 2'    
      }
    ];
  });

  it('should render the correct count of data', () => {
    const list = shallow(<ArticleList articles={articles} />)
    expect(list.find(Article)).to.have.length.of(2);	
	});

  it('should render the correct data', () => {
    const list = shallow(<ArticleList articles={articles} />)
    const article = list.find(Article).at(1);
    expect(article.prop('article').id).to.eql(articles[1].id); 
  });
});