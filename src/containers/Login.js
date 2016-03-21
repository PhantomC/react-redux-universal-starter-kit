import React, { Component } from 'react';

import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import * as memberActions from '../actions/memberActions';

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.handleLoginButton = this.handleLoginButton.bind(this);
	}

	handleLoginButton() {
		this.props.memberLogin();
	}
	
	render() {
		return (
			<div>
				<Helmet title="Member" />
				<div className="col-md-8">
					<button onClick={this.handleLoginButton}>Login</button>
				</div>
				<div className="col-md-4">
					Sidebar		
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {

	}
}

export default connect(mapStateToProps, memberActions)(Login);