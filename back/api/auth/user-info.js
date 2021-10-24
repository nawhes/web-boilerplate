import express from "express";

import userService from '#services/auth/user-service';

const router = express.Router();

router.get('/', userService.getLoginData, userService.sendLoginData);

router.post('/', userService.createUserInfo, userService.saveSession);

router.put('/', userService.setUserInfo);

export default router;