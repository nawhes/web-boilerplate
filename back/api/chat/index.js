import express from "express";

import message from './message.js';

const router = express.Router();

router.use('/message', message);

export default router;