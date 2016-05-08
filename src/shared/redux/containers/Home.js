import * as articleActions from 'shared/redux/actions/articleActions';
import { connect } from 'react-redux';

import Home from 'shared/components/pages/Home';

function mapStateToProps(state) {
  return {
    articleLatest: state.articleLatest,
    member: state.member
  };
}

Home.prefetchData = [
  function(params) {
    return articleActions.getArticleLatest();
  }
];

module.exports = connect(mapStateToProps, articleActions)(Home);