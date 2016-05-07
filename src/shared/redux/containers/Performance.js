import { connect } from 'react-redux';

import * as articleActions from 'shared/redux/actions/articleActions';
import * as performanceActions from 'shared/redux/actions/performanceActions';

import Performance from 'shared/components/pages/Performance';

function mapStateToProps(state) {
  return {
    articles: state.articleLatest
  };
}

module.exports = connect(mapStateToProps, {...articleActions, ...performanceActions})(Performance);