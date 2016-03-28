import React, { Component } from 'react';

import Helmet from 'react-helmet';

import $ from "jquery";

if (process.env.BROWSER == true) {
	require('./magnific-popup/magnific-popup.css');
	require('./magnific-popup/magnific-popup');
}

class Gallery extends Component {
	
	componentDidMount() {
	  	$(this.refs.galleryContainer).magnificPopup({
		  	delegate: 'a',
		  	type: 'image'
		});
	}

	componentWillUnmount() {

  	}

	render() {
		return (
			<div>
				<Helmet title="Gallery" />
				<div className="col-md-8">
					<div ref="galleryContainer">
					  	<a href="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQRPwiVwYaAfhkwry3hhQVaCe_OPiCs5T8myA-p9Z-oCJ6qjdeheA">Image 1</a>
					  	<a href="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSlrS3-Cp3fLrtSofirrkfOm_wS2fT3xw1_dA01_UQhGFQIuVgp">Image 2</a>
					  	<a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJrwYqYKJaeSokzbHnmfYMKh_QLcd6Aj-Bjj15bDYIs2Ec2GCO">Image 3</a>
					</div>
				</div>
				<div className="col-md-4">
					Sidebar		
				</div>
			</div>
		);
	}
}

module.exports = Gallery;