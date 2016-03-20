import React, { Component } from 'react';

import * as articleActions from '../actions/articleActions';
import { connect } from 'react-redux';

import Search from '../components/Search';
import ArticleList from '../components/ArticleList';

class Home extends Component {

	componentDidMount() {
		this.props.getArticleLatest();
	}

	render() {
		return (
			<div>
				<div className="col-md-8">
					<Search getSearchResults={this.props.getSearchResults} />
					<ArticleList articles={ this.props.articleLatest } />
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
		articleLatest: state.articleLatest
	};
}

Home.prefetchData = [
	articleActions.getArticleLatest
];

export default connect(mapStateToProps, articleActions)(Home);