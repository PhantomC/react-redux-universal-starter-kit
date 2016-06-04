import oauthConfig from 'server/configs/oauth';
import config from 'shared/system/configs';

import express from 'express';

import passport from 'passport';
import passportFacebook from 'passport-facebook';
const FacebookStrategy = passportFacebook.Strategy;

import jsonServer from 'json-server';
import mockData from 'server/mockData';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import serverRendering from 'server/renderer';
import routeHandlers from 'server/routes';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const jsonServerRouter = jsonServer.router(mockData());

// Passport configuration
passport.use(new FacebookStrategy({
    clientID: oauthConfig.facebook.clientID,
    clientSecret: oauthConfig.facebook.clientSecret ,
    callbackURL: oauthConfig.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      console.log({accessToken, refreshToken, profile});
      return done(null, profile);
    });
  }
));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(__dirname + 'static'));
app.use('/api', routeHandlers);

// json-server
app.use('/api', routeHandlers);
app.use('/api', jsonServer.defaults());
app.use('/api', jsonServerRouter);

// Passport Routes
app.get('/auth/facebook', passport.authenticate('facebook', { 
  scope: 'email'
}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect : '/', 
    failureRedirect: '/login',
    session: false
  }),
  function(req, res) {
    res.redirect('/');
  });

if (!config.isProduction) {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(serverRendering);

app.listen(config.port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server listening on', config.port);
});