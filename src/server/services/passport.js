import config from 'server/configs';
import passport from 'passport';
import User from 'server/models/User';
import passpostJWT from 'passport-jwt';

const JwtStrategy = passpostJWT.Strategy;
const ExtractJwt = passpostJWT.ExtractJwt;

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