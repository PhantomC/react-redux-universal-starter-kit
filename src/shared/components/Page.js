import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as errorActions from 'shared/system/actions/errorActions';

export default (ComposedComponent) => {
	class Page extends Component {
	  componentWillUnmount() {
	    this.props.resetError();
	  }
	  render() {
	    return <ComposedComponent {...this.props} />;
	  }
	}

	return connect(null, errorActions)(Page);
}