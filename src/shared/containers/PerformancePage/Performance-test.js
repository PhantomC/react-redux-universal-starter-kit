import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Performance from 'shared/containers/PerformancePage/Performance';
import Article from 'shared/containers/PerformancePage/Article';

function setup(Component) {

  const articles = [
    {
      id: '1',
      title: 'Title 1'    
    }, {
      id: '2',
      title: 'Title 2'    
    }
  ];

  const actions = {
    getArticleLatest: sinon.spy(),
    deleteArticle: sinon.spy()
  };
  
  const props = {
    articles,
    ...actions
  };

  const wrapper = mount(<Component {...props} />);

  return {
    wrapper,
    articles,
    actions 
  };
}

describe('<Performance />', () => {

  it('should render correct amount of <Article />', () => {
    const { wrapper, articles } = setup(Performance);
    expect(wrapper.find(Article)).to.have.length(articles.length);
  });

  it('should call delete action if delete button has been clicked', () => {
    const { wrapper, actions } = setup(Performance);
    wrapper.find('button').at(1).simulate('click');
    expect(actions.deleteArticle.calledOnce).to.be.true;
  });

});