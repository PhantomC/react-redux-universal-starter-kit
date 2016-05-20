import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import SearchForm from 'shared/components/partials/SearchForm';

function mountComponent() {
  const spy = sinon.spy();
  const wrapper = mount(<SearchForm getSearchResults={spy} />);
  return {
    spy,
    wrapper
  }
}

describe('<SearchForm />', () => {


  it('should returns a <form />', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper.find('form')).to.have.length(1);    
  });

  it('should have onSubmit props', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper.find('form').props().onSubmit).to.exist;    
  });

  it('should have a text input', () => {
    const wrapper = shallow(<SearchForm />);
    const textInput = wrapper.find('input[type="text"]');
    expect(textInput).to.have.length(1);    
  });

  describe('should response actions', () => {

    it('should call getSearchResults after form submitted', () => {
      const { wrapper, spy } = mountComponent();
      wrapper.find('form').simulate('submit');
      expect(spy.calledOnce).to.be.true;    
    });

    it('should call getSearchResults when input changed', () => {
      const { wrapper, spy } = mountComponent();
      wrapper.find('input').simulate('change');
      expect(spy.calledOnce).to.be.true;    
    });
  });
});