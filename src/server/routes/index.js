import express from 'express';
import expressJwt from 'express-jwt';

import { secretKey } from 'server/configs';

import * as Authentication from 'server/controllers/authentication';

const router = express.Router();

router.use('/members', expressJwt({ secret: secretKey}));

router.post('/login', Authentication.login);

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

export default router;