import React, { Component } from 'react';

import Helmet from 'react-helmet';

import $ from "jquery";

class Gallery extends Component {
	
	componentDidMount() {
		$(this.refs.alertButton).on('click', this.handleButtonClick);
	}

	componentWillUnmount() {
    	$(this.refs.alertButton).off('click', this.handleButtonClick);
  	}

  	handleButtonClick(e) {
		e.preventDefault();
		alert('Clicked!');
  	}

	render() {
		return (
			<div>
				<Helmet title="Gallery" />
				<div ref="galleryContainer" className="col-md-8">
					<a ref="alertButton" href="#">Click me</a>
				</div>
				<div className="col-md-4">
					Sidebar		
				</div>
			</div>
		);
	}
}

module.exports = Gallery;