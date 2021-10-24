import db from '#models/index';

const findLoginData = async (req, res, next) => {
    const user = await db.Users.getData(req.authResult.username);
    if (user === null) {
        return res.json({ code: 2000, message: '회원가입 해주세요.', data: req.authResult });
    }
    req.session.username = user.username;
    next();
}

const saveSession = (req, res, next) => {
    req.session.save((err) => {
        if (err)
            next(err);
        res.status(200).json({ code: 1000, message: 'Welldone.' });
    })
}

const getLoginData = async (req, res, next) => {
    const user = await db.Users.getData(req.session.username);
    req.userInfo = user;
    next();
}

const sendLoginData = (req, res, next) => {
    res.status(200).json({
        code: 1000, message: 'Welldone.', data: req.userInfo
    });
}

const createUserInfo = async (req, res, next) => {
    const userInfo = req.body.userInfo;
    try {
        const user = await db.Users.createData(userInfo);
        req.session.username = user.dataValues.username;
        next();
    } catch (err) {
        next(err);
    }
}

const setUserInfo = async (req, res, next) => {
    const userInfo = req.body;
    try {
        const user = await db.Users.postData(userInfo);
        req.session.username = user.username;
        next();
    } catch (err) {
        next(err);
    }
}

export default { findLoginData, saveSession, createUserInfo, getLoginData, sendLoginData, setUserInfo };
