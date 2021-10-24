import express from "express";

import messageService from '#services/chat/message-service';

const router = express.Router();

router.get('/', messageService.getMessage);

router.post('/', messageService.setMessage);

export default router;