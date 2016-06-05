import oauthConfig from 'server/configs/passport/oauth';

import passportFacebook from 'passport-facebook';
const FacebookStrategy = passportFacebook.Strategy;

import mongoose from 'mongoose';
const User = mongoose.model('user');

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: oauthConfig.facebook.clientID,
      clientSecret: oauthConfig.facebook.clientSecret ,
      callbackURL: oauthConfig.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 
        oauthStrategy: 'facebook',
        oauthID: profile.id 
      }, function(err, user) {
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
    }
  ));
};
