import { secretKey } from 'server/configs';

import mongoose from 'mongoose';
import passport from 'passport';

import passpostLocal from 'passport-local';
import passpostJWT from 'passport-jwt';
import passportFacebook from 'passport-facebook';

import oauthConfig from 'server/configs/oauth';

const User = mongoose.model('user');

// Local Strategy
const LocalStrategy = passpostLocal.Strategy;

const localOptions = {
  usernameField: 'username'
};

const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false)
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});


// JWT Strategy
const JwtStrategy = passpostJWT.Strategy;
const ExtractJwt = passpostJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secretKey
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


// Facebook Strategy
const FacebookStrategy = passportFacebook.Strategy;

const facebookOptions = {
  clientID: oauthConfig.facebook.clientID,
  clientSecret: oauthConfig.facebook.clientSecret,
  callbackURL: oauthConfig.facebook.callbackURL
};
const facebookLogin = new FacebookStrategy(facebookOptions, function(accessToken, refreshToken, profile, done) {
  User.findOne({ 
    oauthStrategy: 'facebook',
    oauthID: profile.id 
  }, 
  function(err, user) {
    if (err) {
      return done(err);
    }
    if (user !== null) {
      return done(null, user);
    }

    user = new User({
      username: '',
      password: '',
      email: profile.emails !== undefined ? profile.emails[0].value : '',
      oauthID: profile.id,
      oauthStrategy: 'facebook',
      name: profile.displayName || '',
      created: Date.now()
    });

    user.save(function(err) {
      if(err) {
        return done(err);
      } else {
        done(null, user);
      }
    });
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
passport.use(facebookLogin);