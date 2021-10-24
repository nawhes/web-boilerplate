import express from "express";

import imgService from '../../services/img/img-service.js'

const router = express.Router();

router.get('/', imgService.getImgUrl, imgService.sendImgUrl);

export default router;