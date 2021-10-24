import express from "express";

import githubAuthService from '#services/auth/github'
import userService from '#services/auth/user-service';

const router = express.Router();

router.post('/', githubAuthService, userService.findLoginData, userService.saveSession);

export default router;