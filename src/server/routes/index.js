import express from 'express';
import passport from 'passport';

import * as Authentication from 'server/controllers/authentication';
import passportService from 'server/services/passport';

const requiredJwt = passport.authenticate('jwt', { session: false });
const requiredSignin = passport.authenticate('local', { session: false });

const router = express.Router();

router.use('/api/members', requiredJwt);

router.post('/api/signup', Authentication.signup);
router.post('/api/login', requiredSignin, Authentication.login);

router.get('/auth/facebook', passport.authenticate('facebook', { 
  scope: 'email'
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/login',
    session: false
  }),
  Authentication.oAuthCallback);

export default router;