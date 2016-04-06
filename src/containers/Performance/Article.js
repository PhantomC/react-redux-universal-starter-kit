import React, { Component } from 'react';

import pureRender from 'pure-render-decorator';

@pureRender
class Article extends Component {
	
	constructor(props) {
		super(props);
	}

	onDeleteArticle(id) {
		this.props.handleDeleteArticle(id);
	}

	render() {
		const { article } = this.props;
		return (
			<article className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
				<div>
					<img src="http://placehold.it/400x200" alt="" />
				</div>
				<button onClick={ this.onDeleteArticle.bind(this, article.id) }>Delete #{ article.id }</button>
			</article>
		);
	}
}

export default Article;