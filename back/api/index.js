import express from 'express';

import auth from './auth/index.js';
import img from './img/index.js';
import chat from './chat/index.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/img', img);
router.use('/chat', chat);

export default router;
