import React, { Component } from 'react';

class Article extends Component {
	
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.article.id !== nextProps.article.id;
	} 

	onDeleteArticle(id) {
		this.props.handleDeleteArticle(id);
	}

	render() {
		const { article } = this.props;
		return (
			<article className="col-xs-6 col-sm-4">
				<div>
					<img src="http://placehold.it/400x200" alt="" />
				</div>
				<span>{ article.id }</span>
				<button onClick={ this.onDeleteArticle.bind(this, article.id) }>Delete</button>
			</article>
		);
	}
}

export default Article;