import fs from 'fs';
import path from 'path';

const getImgUrl = (req, res, next) => {
    const regex = /^(avatar).*/;;
    const files = fs.readdirSync(path.join(path.resolve(), 'public'));
    const avatar = files.filter(ele => ele.match(regex));

    Object.assign(req, {files : avatar});
    next();
}

const sendImgUrl = (req, res, next) => {
    res.status(200).json({
        code: 1000, message: 'Welldone.', data: req.files
    });
}

export default {getImgUrl, sendImgUrl};