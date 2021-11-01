import expressLoader from './express';
import socketioLoader from './socketio';
import typeormLoader from './typeorm';
import Logger from './logger';

export default async ({ expressApp, http }) => {
    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
    await socketioLoader({ app: expressApp, http });
    Logger.info('✌️ Socketio loaded');
    await typeormLoader();
    Logger.info('✌️ Typeorm loaded');


    // ... more loaders can be here
};
