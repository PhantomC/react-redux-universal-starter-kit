import express from 'express';
import passport from 'passport';

import { generateToken } from 'server/controllers/authentication';
import { AUTH_TOKEN } from 'shared/system/constants';

const router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook', { 
  scope: 'email'
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/login',
    session: false
  }),
  function(req, res) {
    res.cookie(AUTH_TOKEN, generateToken(req.user), { maxAge: 60*30*1000, httpOnly: true });
    res.redirect('/');
  });

export default router;