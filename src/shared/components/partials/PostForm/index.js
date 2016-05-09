import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class PostForm extends Component {
  render() {
    const { fields: { title, content }, handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={ handleSubmit(this.props.onPostFormSubmit) }>
        <div className={`form-group${title.touched && title.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Title</label>
          <div className="col-md-4">
            <input type="text" placeholder="Title" className="form-control" {...title} />
            <div className="text-help">
              { title.touched ? title.error : null }
            </div>
          </div>
        </div>
        <div className={`form-group${content.touched && content.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Content</label>
          <div className="col-md-4">
            <textarea placeholder="content" rows="3" className="form-control" {...content} />
            { content.touched ? content.error : null }
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 col-md-offset-2">
            <button type="submit" className="btn btn-default">Publish</button>
          </div>
        </div>
      </form>
    );
  }
}

PostForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter title';
  }

  if (!values.content) {
    errors.content = 'Please enter content';
  }
  return errors;
}

export default reduxForm({
  form: 'postForm',
  fields: ['title', 'content'],
  validate
})(PostForm);