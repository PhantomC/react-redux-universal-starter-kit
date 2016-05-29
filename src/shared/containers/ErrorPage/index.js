import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './ErrorPage.scss';

class ErrorPage extends Component {
  render() {
    let {error} = this.props;
    if (error === null) {
      error = {
        status: 404, 
        statusText: 'Not Found'
      };
    }
    return (
      <div>
        <Helmet title={`${error.status} - ${error.statusText}`} />
        <div className="col-md-12">
          <div styleName="container">
            <h1 styleName="title">{error.status}</h1>
            <h3 styleName="sub-title">{error.statusText}</h3>
            <p styleName="messege"></p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({error}) {
  return {error};
}

module.exports = connect(mapStateToProps)(CSSModules(ErrorPage, styles));