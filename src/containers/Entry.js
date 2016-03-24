import React, { Component } from 'react';

import Helmet from 'react-helmet';

import * as articleActions from '../actions/articleActions';
import { connect } from 'react-redux';

import ArticleList from '../components/ArticleList';
import ArticleContent from '../components/ArticleContent';

class Entry extends Component {

	componentDidMount() {
		if (this.props.articleActive.data.id != this.props.params.id) {
			this.props.getArticleContentById(this.props.params.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			this.props.getArticleContentById(nextProps.params.id);
		}
	}

	renderArticle() {
		if (this.props.articleActive.error) {
			return (
				<div>{ this.props.articleActive.error }</div>
			);
		}
		return (
			<ArticleContent article={this.props.articleActive.data} />
		);
	}

	render() {
		return (
			<div>
				<Helmet 
					title={ this.props.articleActive.data.title }
					meta={[
				        {
				        	"name": "description", 
				        	"content": "Add description here"
				        }
				    ]} 
			    />
				<div className="col-md-8">
					{ this.renderArticle() }
				</div>
				<div className="col-md-4">
					<ArticleList articles={this.props.articleActive.related} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		articleActive: state.articleActive
	};
}

Entry.prefetchData = [
	function(params) {
		return articleActions.getArticleContentById(params.id);
	}
];

module.exports = connect(mapStateToProps, articleActions)(Entry);