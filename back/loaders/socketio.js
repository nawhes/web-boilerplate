import http from 'http';
import { Server } from 'socket.io';

import socket from '#services/socket';

export default async ({ app, http }) => {
    const io = new Server(http, {
        path: '/socketio',
        cors: {
            origin: "*",
        }
    });
    socket(io);
};