import React, { Component } from 'react';

import Helmet from 'react-helmet';

import Header from 'shared/components/layouts/Header';

import CSSModules from 'react-css-modules';
import styles from './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet
            title="React Redux Universal Starter Kit"
        />
        <Header />
        <div styleName="body" className="container">
          <div className="row">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CSSModules(App, styles);