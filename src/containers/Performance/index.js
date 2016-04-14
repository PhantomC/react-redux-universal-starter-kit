import { connect } from 'react-redux';
import * as articleActions from '../../actions/articleActions';
import * as performanceActions from '../../actions/performanceActions';
import Performance from './Performance';

function mapStateToProps(state) {
  return {
    articles: state.articleLatest
  };
}

module.exports = connect(mapStateToProps, {...articleActions, ...performanceActions})(Performance);