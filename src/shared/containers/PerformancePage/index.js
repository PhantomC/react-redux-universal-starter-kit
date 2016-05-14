import React from 'react';
import { connect } from 'react-redux';

import * as articleActions from 'shared/redux/actions/articleActions';

import Performance from 'shared/containers/PerformancePage/Performance';

function mapStateToProps({article}) {
  return {
    articles: article.latest
  };
}

module.exports = connect(mapStateToProps, articleActions)(Performance);