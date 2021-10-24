import expressLoader from '#loaders/express';
import socketioLoader from '#loaders/socketio';
import Logger from '#loaders/logger';

export default async ({ expressApp, http }) => {
    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
    await socketioLoader({ app: expressApp, http });
    Logger.info('✌️ Socketio loaded');


    // ... more loaders can be here
};
