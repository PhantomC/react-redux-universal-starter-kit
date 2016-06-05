import express from 'express';
import expressJwt from 'express-jwt';

import { secretKey } from 'server/configs';

import * as Authentication from 'server/controllers/authentication';
import passport from 'passport';
import passportService from 'server/services/passport';

const requiredAuth = passport.authenticate('jwt', { session: false });
const requiredSignin = passport.authenticate('local', { session: false });

const router = express.Router();

router.use('/members', expressJwt({ secret: secretKey}));

router.post('/signup', Authentication.signup);
router.post('/login', requiredSignin, Authentication.login);

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

export default router;