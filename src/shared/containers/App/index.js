import React, { Component } from 'react';

import Helmet from 'react-helmet';

import Header from 'shared/containers/App/Header';

import CSSModules from 'react-css-modules';
import './global.scss';
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
        <div className="container" styleName="body">
          <div className="row">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CSSModules(App, styles);