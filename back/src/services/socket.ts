import Logger from "@loaders/logger";

const separateSelf = (usersObj, keySelf) => {
    return usersObj[keySelf];
}

const users = new Map();
export default function (io) {
    io.on('connect', (socket) => {
        Logger.info(socket.id + ' is connected!!');
        socket.on('join', (args) => {
            users.set(socket.id, args);
            const usersObj = Object.fromEntries(users);
            const self = separateSelf(usersObj, socket.id);
            socket.emit('drawSelf', self);
            io.emit('drawOthers', usersObj);
            io.emit('showUsers', usersObj);
        })
        socket.on('move', (args) => {
            const user = users.get(socket.id);
            user.locationX = args.locationX;
            user.locationY = args.locationY;
            user.act = args.act;
            const usersObj = Object.fromEntries(users);
            const self = separateSelf(usersObj, socket.id);
            socket.emit('drawSelf', self)
            socket.broadcast.emit('drawOthers', usersObj);
        })
        socket.on('chatToAll', (message) => {
            io.emit('chat', message);
        })
        // chat to zone?? chat to near??
        socket.on('exit', () => {
            const exitedSocketId = socket.id;
            const disconnectUser = JSON.parse(JSON.stringify(users.get(socket.id)));
            users.delete(socket.id);
            io.emit('exit', exitedSocketId);
            Logger.info(socket.id + ' is exited!!');
        })
        socket.on('disconnect', () => {
            if (users.get(socket.id) !== undefined) {
                const exitedSocketId = socket.id;
                const disconnectUser = JSON.parse(JSON.stringify(users.get(socket.id)));
                users.delete(socket.id);
                io.emit('exit', exitedSocketId);
            }
            Logger.info(socket.id + ' is disconnected!!');
        })
    })
}