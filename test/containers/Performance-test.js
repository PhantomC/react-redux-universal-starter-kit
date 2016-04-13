import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

import Performance from '../../src/containers/Performance/Performance';
import Article from '../../src/containers/Performance/Article';

chai.use(spies);

function getProps() {

  const articles = [
    {
      id: '1',
      title: 'Title 1'    
    }, {
      id: '2',
      title: 'Title 2'    
    }
  ];

  return {
    articles,
    getArticleLatest: chai.spy(),
    deleteArticle: chai.spy()
  };
}

describe('<Performance />', () => {

	it('should render correct amount of <Article />', () => {
    const props = getProps();
    const wrapper = mount(<Performance {...props} />);
		expect(wrapper.find(Article)).to.have.length(2);
	});


  it('should call delete action if delete button has been clicked', () => {
    const props = getProps();
    const wrapper = mount(<Performance {...props} />);
    wrapper.find('button').at(1).simulate('click');
    expect(props.deleteArticle).to.have.been.called();
  });


});