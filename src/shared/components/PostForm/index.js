import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import CSSModules from 'react-css-modules';
import styles from './PostForm.scss';

class PostForm extends Component {
  render() {
    const { fields: { title, body, excerpt, tags }, handleSubmit } = this.props;
    return (
      <div styleName="container">
        <form className="form-horizontal" onSubmit={ handleSubmit(this.props.onPostFormSubmit) }>
          <div className={`form-group${title.touched && title.invalid ? ' has-danger' : '' }`}>
            <div>
              <input type="text" placeholder="Title" className="form-control" {...title} />
              <div className="text-help">
                { title.touched ? title.error : null }
              </div>
            </div>
          </div>
          <div className={`form-group${body.touched && body.invalid ? ' has-danger' : '' }`}>
            <div>
              <textarea placeholder="Body" rows="5" className="form-control" {...body} />
              <div className="text-help">
                  { body.touched ? body.error : null }
              </div>
            </div>
          </div>
          <div className={`form-group${excerpt.touched && excerpt.invalid ? ' has-danger' : '' }`}>
            <div>
              <textarea placeholder="Excerpt" rows="3" className="form-control" {...excerpt} />
              <div className="text-help">
                  { excerpt.touched ? excerpt.error : null }
              </div>
            </div>
          </div>
          <div className={`form-group${tags.touched && tags.invalid ? ' has-danger' : '' }`}>
            <div>
              <input type="text" placeholder="Tags" className="form-control" {...tags} />
              <div className="text-help">
                { tags.touched ? tags.error : null }
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" styleName="submit-button" className="btn btn-primary">Publish</button>
          </div>
        </form>
      </div>

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
}, mapStateToProps)( CSSModules(PostForm, styles) );
