import http from 'http';
import { Server } from 'socket.io';

export default async ({ app, http }) => {
    const io = new Server(http, {
        path: '/socketio',
        cors: {
            origin: "*",
        }
    });
};