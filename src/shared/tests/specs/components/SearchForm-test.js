import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import SearchForm from 'shared/components/partials/SearchForm';

describe('<SearchForm />', () => {

  let wrapper = {};
  let getSearchResults = sinon.spy();

  before(() => {
    wrapper = mount(<SearchForm getSearchResults={getSearchResults} />);
  });

  it('should returns a <form />', () => {
    expect(wrapper.find('form').length).to.equal(1);    
  });

  it('should call getSearchResults when input changed', () => {
    wrapper.find('input').simulate('change');
    expect(getSearchResults.calledOnce).to.be.true;    
  });

});