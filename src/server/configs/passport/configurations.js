import oauthConfig from 'server/configs/passport/oauth';

import passportFacebook from 'passport-facebook';
const FacebookStrategy = passportFacebook.Strategy;

module.exports = function(passport) {
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
};