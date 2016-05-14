import express from 'express';
import expressJwt from 'express-jwt';
import { secretKey } from 'server/configs';

import * as Authentication from 'server/controllers/authentication';
import * as Member from 'server/controllers/member';

const router = express.Router();

router.use(expressJwt({ secret: secretKey}).unless({
  path: [
    '/api/login', 
    '/api/articles'
  ]
}));

router.post('/login', Authentication.login);
router.get('/member/profile', Member.profile);

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

export default router;