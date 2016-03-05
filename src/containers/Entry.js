import React, { Component } from 'react';

import * as articleActions from '../actions/articleActions';
import { connect } from 'react-redux';

import ArticleList from '../components/ArticleList';

class Entry extends Component {

	componentDidMount() {
		this.props.getArticleById(this.props.params.id);
		this.props.getArticleLatest();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			this.props.getArticleById(nextProps.params.id);
			this.props.getArticleLatest();
		}
	}

	render() {
		return (
			<div>
				<div className="col-md-8">
					<article>
						<h1>{ this.props.articleActive.title }</h1>
						<div dangerouslySetInnerHTML={{ __html: this.props.articleActive.body }} />
					</article>
				</div>
				<div className="col-md-4">
					<ArticleList articles={this.props.articleLatest} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		articleActive: state.articleActive,
		articleLatest: state.articleLatest
	};
}

Entry.prefetchData = [
	function(params) {
		return articleActions.getArticleById(params.id);
	},
	articleActions.getArticleLatest
];

export default connect(mapStateToProps, articleActions)(Entry);