import { connect } from 'react-redux';
import * as memberActions from 'shared/redux/actions/memberActions';

import Member from 'shared/components/pages/Member';

function mapStateToProps({member}) {
  return {member};
}


module.exports = connect(mapStateToProps, memberActions)(Member);