import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import ArticleList from './ArticleList';

export default class Entry extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			article: {},
			articleLatest: []
		}
	}

	componentDidMount() {
		this.getArticleById(this.props.params.id);
		this.getLatestArticles();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			this.getArticleById(nextProps.params.id);
			this.getLatestArticles();
		}
	}

	componentWillUnmount() {
		this.ignoreLastFetch = true;
	}

	getArticleById(id) {
		fetch(`http://localhost:3004/articles/${id}`)
		    .then(function(response) {
		        if (response.status >= 400) {
		            throw new Error("Bad response from server");
		        }
		        return response.json();
		    })
		    .then((data) => {
		        if (!this.ignoreLastFetch) {
			        this.setState({
			        	article: data
			        });
		        }
		    });
	}

	getLatestArticles() {
		fetch('http://localhost:3004/articles')
		    .then(function(response) {
		        if (response.status >= 400) {
		            throw new Error("Bad response from server");
		        }
		        return response.json();
		    })
		    .then((data) => {
		        if (!this.ignoreLastFetch) {
	 				this.setState({
			        	articleLatest: data
			        });
		        }
		    });
	}

	render() {
		return (
			<div>
				<div className="col-md-8">
					<article>
						<h1>{ this.state.article.title }</h1>
						<div dangerouslySetInnerHTML={{ __html: this.state.article.body }} />
					</article>
				</div>
				<div className="col-md-4">
					<ArticleList articles={this.state.articleLatest} />
				</div>
			</div>
		);
	}
}