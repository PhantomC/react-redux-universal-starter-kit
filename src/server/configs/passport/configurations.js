import oauthConfig from 'server/configs/passport/oauth';

import passportFacebook from 'passport-facebook';
const FacebookStrategy = passportFacebook.Strategy;

module.exports = function(passport) {

  // // Maintaining persistent login sessions
  // // serialized  authenticated user to the session
  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });

  // // deserialized when subsequent requests are made
  // passport.deserializeUser(function(id, done) {
  //     // User.findById(id, function(err, user) {
  //     //   done(err, user);
  //     // });
  //     done(err, user);
  // });

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });



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