import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { MEMBER_LOAD_AUTH } from 'shared/system/constants';

import App from 'shared/containers/App';
import HomePage from 'shared/containers/HomePage';
import ContactPage from 'shared/containers/ContactPage';
import GalleryPage from 'shared/containers/GalleryPage';
import PerformancePage from 'shared/containers/PerformancePage';
import EntryPage from 'shared/containers/EntryPage';

import LoginPage from 'shared/containers/LoginPage';
import MemberPage from 'shared/containers/MemberPage';
import MyArticles from 'shared/containers/MemberPage/MyArticles';
import MyBookmarks from 'shared/containers/MemberPage/MyBookmarks';
import ArticleEdit from 'shared/containers/MemberPage/ArticleEdit';

import ErrorPage from 'shared/containers/ErrorPage';

export default ({ dispatch, getState }) => {
  
  const isAuthenticated = (nextState, replace) => {
    
    let { member: { isAuthenticated } } = getState();

    function checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        replace('/login');
      }
    }
    
    if (!isAuthenticated) {
      dispatch({
        type: MEMBER_LOAD_AUTH,
        callback: (isAuthenticated) => {
          checkAuth(isAuthenticated);
        }
      });
    } else {
      checkAuth(isAuthenticated);
    }

  };

  const hasAlreadyLoggedIn = (nextState, replace) => {
    let { member: { isAuthenticated } } = getState();

    if (isAuthenticated) {
      replace('/member');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="contact" component={ContactPage} />
      <Route path="gallery" component={GalleryPage} />
      <Route path="performance" component={PerformancePage} />
      <Route path="articles/:id" component={EntryPage} />
      <Route path="login" component={LoginPage} onEnter={hasAlreadyLoggedIn} />
      <Route path="member" component={MemberPage} onEnter={isAuthenticated}>
        <IndexRoute component={MyArticles} />
        <Route path="bookmarks" component={MyBookmarks} />
        <Route path="articles/:id" component={ArticleEdit} />
      </Route>
      <Route path="*" component={ErrorPage} status="404" />
    </Route>
  );
};