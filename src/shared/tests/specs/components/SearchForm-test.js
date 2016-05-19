import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import SearchForm from 'shared/components/partials/SearchForm';

describe('<SearchForm />', () => {

  let wrapper = {};
  const spy = sinon.spy();

  before(() => {
    wrapper = mount(<SearchForm getSearchResults={spy} />);
  });

  it('should returns a <form />', () => {
    expect(wrapper.find('form')).to.have.length(1);    
  });

  it('should call getSearchResults when input changed', () => {
    wrapper.find('input').simulate('change');
    expect(spy.calledOnce).to.be.true;    
  });

});