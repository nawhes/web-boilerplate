import express from "express";

import imgPath from './img-path.js';

const router = express.Router();

router.use('/', imgPath);

export default router;