import { connect } from 'react-redux';

import * as contactActions from 'shared/redux/actions/contactActions';

import Contact from 'shared/components/pages/Contact';

function mapStateToProps(state) {
  return {
    form: state.form
  };
}

module.exports = connect(mapStateToProps, contactActions)(Contact);