import EventEmitter from 'events'

import db from '#models/index'
import Logger from '#loaders/logger'

class Subscriber extends EventEmitter {
    constructor() {
        super();
        this.on('saveUserInfo', async (userInfo) => {
            try {
                await db.Users.postData(userInfo);
            } catch (err) {
                Logger.error(err);
            }
        })
        this.on('saveMessage', async (message) => {
            try {
                await db.Message.createMessage(message);
            } catch (err) {
                Logger.error(err);
            }
        })
    }
}

const subscriber = new Subscriber();
export default subscriber;