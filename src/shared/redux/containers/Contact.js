import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';

import * as contactActions from '../actions/contactActions';

import ContactForm from '../../components/ContactForm';

class Contact extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      sent: false
    };
  }

  handleSubmit(data) {
    this.props.saveContactFormData(data);
    this.setState({
      sent: true
    });
  }

  render() {
    return (
      <div>
        <Helmet title="Contact" />
        <div className="col-md-8">
          <ContactForm onSubmit={ this.handleSubmit } />
          { this.state.sent ? (
            <div className="alert alert-success">
              <strong>Success!</strong> Your message was sent successfully.
            </div>
          ) : null }
        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    form: state.form
  };
}

module.exports = connect(mapStateToProps, contactActions)(Contact);