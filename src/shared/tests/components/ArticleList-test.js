import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ArticleList from 'shared/components/partials/Article/ArticleList';
import ArticleItem from 'shared/components/partials/Article/ArticleItem';

describe('<ArticleList />', () => {
  
  let articles = [];
  let wrapper = {};

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
    
    wrapper = shallow(<ArticleList articles={articles} />);
  });

  it('should render the correct count of data', () => {
    expect(wrapper.find(ArticleItem)).to.have.length(2);  
  });

  it('should render the correct data', () => {
    expect(wrapper.find(ArticleItem).at(1).props().article.id).to.eql(articles[1].id); 
  });
});