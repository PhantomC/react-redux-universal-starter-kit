import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class PostForm extends Component {
  render() {
    const { fields: { title, body, excerpt, tags }, handleSubmit } = this.props;
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
        <div className={`form-group${body.touched && body.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Body</label>
          <div className="col-md-4">
            <textarea placeholder="Body" rows="5" className="form-control" {...body} />
            { body.touched ? body.error : null }
          </div>
        </div>
        <div className={`form-group${excerpt.touched && excerpt.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Excerpt</label>
          <div className="col-md-4">
            <textarea placeholder="Excerpt" rows="3" className="form-control" {...excerpt} />
            { excerpt.touched ? excerpt.error : null }
          </div>
        </div>
        <div className={`form-group${tags.touched && tags.invalid ? ' has-danger' : '' }`}>
          <label className="col-md-2 control-label">Tags</label>
          <div className="col-md-4">
            <input type="text" placeholder="Tags" className="form-control" {...tags} />
            <div className="text-help">
              { tags.touched ? tags.error : null }
            </div>
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

  if (!values.body) {
    errors.body = 'Please enter body';
  }

  if (!values.excerpt) {
    errors.excerpt = 'Please enter excerpt';
  }

  if (!values.tags) {
    errors.tags = 'Please enter tags';
  }

  return errors;
}

function mapStateToProps({member}) {
  return {
    initialValues: member.myArticleEdit
  };
}

export default reduxForm({
  form: 'postForm',
  fields: ['title', 'body', 'excerpt', 'tags'],
  validate
}, mapStateToProps)(PostForm);