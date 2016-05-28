import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class MyBookmarks extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        My Bookmarks
      </div>
    );
  }
}

module.exports = MyBookmarks;