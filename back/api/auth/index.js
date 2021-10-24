import express from "express";

import github from './github.js';
import userInfo from './user-info.js';

const router = express.Router();

router.use('/github', github)
router.use('/userinfo', userInfo)

export default router;