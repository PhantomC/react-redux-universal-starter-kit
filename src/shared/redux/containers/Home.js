import * as articleActions from '../actions/articleActions';
import { connect } from 'react-redux';

import Home from '../../components/pages/Home';

function mapStateToProps(state) {
  return {
    articleLatest: state.articleLatest
  };
}

Home.prefetchData = [
  function(params) {
    return articleActions.getArticleLatest();
  }
];

module.exports = connect(mapStateToProps, articleActions)(Home);