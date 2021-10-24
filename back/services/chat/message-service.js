import db from '#models/index';

const getMessage = async (req, res, next) => {
    const message = await db.Message.getMessageToAll(req.username);
    if (message === null) {
        return res.json({ code: 3000, message: '머선 129?.' });
    }
    res.status(200).json({
        code: 1000, message: 'Welldone.', data: message
    });
}

const setMessage = async (req, res, next) => {
    const messageInfo = req.body;
    const result = await db.Message.createMessage(messageInfo);
    if (result === null) {
        return res.json({ code: 3000, message: '머선 129?.' });
    }
    res.status(200).json({
        code: 1000, message: 'Welldone.'
    });
}

export default { setMessage, getMessage };
