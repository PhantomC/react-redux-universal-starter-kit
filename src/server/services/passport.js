import * as config from 'server/configs';
import mongoose from 'mongoose';
import passport from 'passport';
// import User from 'server/models/User';
import passpostJWT from 'passport-jwt';
import passpostLocal from 'passport-local';

const User = mongoose.model('user');

const JwtStrategy = passpostJWT.Strategy;
const ExtractJwt = passpostJWT.ExtractJwt;

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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secretKey
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

passport.use(jwtLogin);
passport.use(localLogin);