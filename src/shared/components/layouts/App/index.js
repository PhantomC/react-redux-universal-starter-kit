import React, { Component } from 'react';

import Helmet from 'react-helmet';

import Header from 'shared/components/layouts/Header';
import Footer from 'shared/components/layouts/Footer';

import CSSModules from 'react-css-modules';
import styles from './styles.scss';

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
        <Footer />
      </div>
    );
  }
}

module.exports = CSSModules(App, styles);