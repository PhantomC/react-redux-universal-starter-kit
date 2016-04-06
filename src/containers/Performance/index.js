import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Perf from 'react-addons-perf';

import { connect } from 'react-redux';
import * as articleActions from '../../actions/articleActions';
import * as performanceActions from '../../actions/performanceActions';
import Article from './Article';

class Performance extends Component {
	
	constructor(props) {
		super(props);
		this.startPerf = this.startPerf.bind(this);
		this.stopPerf = this.stopPerf.bind(this);
		this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
	}

	componentDidMount() {
		this.props.getArticleLatest();
	}

	startPerf() {
		Perf.start();
	}

	stopPerf() {
		Perf.stop();
		Perf.printDOM();
	}

	handleDeleteArticle(id) {
		this.props.deleteArticle(id);
	}

	render() {
		
		return (
			<div>
				<Helmet title="Gallery" />
				<div className="col-md-8">
					<div className="row">
						<div className="col-xs-12">
							<button onClick={this.startPerf}>Start</button>
							<button onClick={this.stopPerf}>Stop</button>
						</div>
					</div>
					<div className="row">
						{ this.props.articles.map((article, index) => {
							return <Article key={ article.id } article={article} handleDeleteArticle={ this.handleDeleteArticle } />
						}) }
					</div>
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
		articles: state.articleLatest
	}
}

module.exports = connect(mapStateToProps, {...articleActions, ...performanceActions})(Performance);