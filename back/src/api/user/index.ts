import express from "express";
import user from './user'

export default () => {
    const router = express.Router();
    router.use('/user', user)

    return router;
}
