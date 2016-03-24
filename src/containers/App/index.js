import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Helmet from "react-helmet";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

require('./global.css');
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class App extends Component {

	constructor(props) {
		super(props);
	}

	handlePageTransition() {
		const transitionName = this.props.location.state ? this.props.location.state.transition : false;
		if (transitionName) {
			return (
				<ReactCSSTransitionGroup
		          	component="div"
		          	transitionAppear={true}
		          	transitionName={this.props.location.state ? this.props.location.state.transition : 'default'}
		          	transitionAppearTimeout={500}
		          	transitionEnterTimeout={1000}
		          	transitionLeaveTimeout={1000}
		        >
		          	{React.cloneElement(this.props.children, {
		            	key: this.props.location.pathname
		          	})}
		        </ReactCSSTransitionGroup>
			);
		}
		return this.props.children;
	}

	render() {
		return (
			<div>
				<Helmet
				    title="React Redux Universal Starter Kit"
				/>
				<Header />
				<div styleName="body" className="container">
					<div className="row">
						{ this.handlePageTransition() }
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

module.exports = CSSModules(App, styles);