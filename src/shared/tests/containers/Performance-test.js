import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

import { PerformancePage } from 'shared/containers/PerformancePage';
import Article from 'shared/containers/PerformancePage/Article';

chai.use(spies);

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
    getArticleLatest: chai.spy(),
    deleteArticle: chai.spy()
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

describe('<PerformancePage />', () => {

  it('should render correct amount of <Article />', () => {
    const { wrapper, articles } = setup(PerformancePage);
    expect(wrapper.find(Article)).to.have.length(articles.length);
  });

  it('should call delete action if delete button has been clicked', () => {
    const { wrapper, actions } = setup(PerformancePage);
    wrapper.find('button').at(1).simulate('click');
    expect(actions.deleteArticle).to.have.been.called();
  });

});