import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook', { 
  scope: 'email'
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect : '/', 
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/auth/loadAuth', function(req, res) {
  res.json(req.session.passport ? req.session.passport.user : null);
});

export default router;