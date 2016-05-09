import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './Search.scss';

class Search extends Component {
  
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
      <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <div className="col-sm-10">
            <input className="form-control" onChange={this.handleInputChange} ref="keyword" type="text" placeholder="Search" />
          </div>
          <div className="col-sm-2">
            <button className="form-control btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default CSSModules(Search, styles);