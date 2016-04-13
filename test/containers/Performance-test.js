import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import { Performance } from '../../src/containers/Performance';
import Article from '../../src/containers/Performance/Article';

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
    getArticleLatest: sinon.spy()
  };
}

describe('<Performance />', () => {

	it('should render correct amount of <Article />', () => {
    const props = getProps();
    const wrapper = mount(<Performance {...props} />);
		expect(wrapper.find(Article)).to.have.length(2);
	});

});