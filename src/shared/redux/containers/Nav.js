import { connect } from 'react-redux';
import * as memberActions from 'shared/redux/actions/memberActions';

import Nav from 'shared/components/layouts/Nav';

function mapStateToProps({member}) {
  return {member};
}

module.exports = connect(mapStateToProps, memberActions)(Nav);