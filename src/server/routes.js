import express from 'express';
import * as Authentication from './controllers/authentication';

const router = express.Router();

router.post('/login', Authentication.login);

export default router;