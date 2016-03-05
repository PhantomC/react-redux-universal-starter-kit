import React, { Component } from 'react';

export default class Search extends Component {
	
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleFormSubmit(event) {
		event.preventDefault();
		this.props.getSearchResults(this.refs.keyword.value);
		this.refs.keyword.value = '';
	}

	handleInputChange() {
		this.props.getSearchResults(this.refs.keyword.value);
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<input onChange={this.handleInputChange} ref="keyword" type="text" placeholder="Search" />
				<button>Submit</button>
			</form>
		);
	}
}