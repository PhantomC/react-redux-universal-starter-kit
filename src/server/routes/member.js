import express from 'express';

import * as Member from 'server/controllers/member';

const router = express.Router();

router.get('/profile', Member.profile);

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

export default router;