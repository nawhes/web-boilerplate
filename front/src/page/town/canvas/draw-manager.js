import addImgProcess from '@tools/addImgProcess.js';

async function loadPlayersImg(playerImgs, imgSrc) {
    if (!playerImgs.has(imgSrc)) {
        await addImgProcess(imgSrc).then((imageInstance) => {
            playerImgs.set(imgSrc, imageInstance);
        }).catch((err) => {
            console.error(err);
        });
    }
}

const handleKeyCode = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    A: 65,
    W: 87,
    D: 68,
    S: 83,
    Z: 90,
}

const avatarAttr = {
    width: 32,
    height: 64,
    unit: 32,
}

const isHandleKeys = (keyCode) => Object.values(handleKeyCode).some((elem) => elem === keyCode);
const getAction = (keyCode) => {
    if (keyCode === handleKeyCode.left || keyCode === handleKeyCode.A)
        return 'left';
    if (keyCode === handleKeyCode.right || keyCode === handleKeyCode.D)
        return 'right';
    if (keyCode === handleKeyCode.up || keyCode === handleKeyCode.W)
        return 'up';
    if (keyCode === handleKeyCode.down || keyCode === handleKeyCode.S)
        return 'down';
    if (keyCode === handleKeyCode.Z)
        return 'dance';
}
const getPositionOfMap = (target, background, canvas) => {
    if (target < canvas / 2)
        return 'edgeMin';
    if (target > background - canvas / 2)
        return 'edgeMax';
    return 'center';
}

const playerImgs = new Map();
function drawManager(socket, backgroundImg, userInfo) {
    let ctx;
    let self = JSON.parse(JSON.stringify(userInfo));
    let users;
    const viewport = {
        xMin: 0,
        xMax: 0,
        yMin: 0,
        yMax: 0
    }
    const map = {
        width: 0,
        height: 0,
        paddingRow: 0,
        paddingCol: 0
    }
    const isShow = (avatar) => {
        return avatar.locationX >= viewport.xMin && avatar.locationX <= viewport.xMax &&
            avatar.locationY >= viewport.yMin && avatar.locationY <= viewport.yMax;
    }
    const drawAvatar = (avatar, ctx) => {
        const img = playerImgs.get(avatar.img);
        ctx.drawImage(img,
            avatar.act, 0, avatarAttr.width, avatarAttr.height,
            map.paddingCol / 2 + avatar.locationX - viewport.xMin,
            map.paddingRow / 2 + avatar.locationY - viewport.yMin - avatarAttr.unit,
            avatarAttr.width, avatarAttr.height);
    }

    const drawSelf = () => {
        ctx.background.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);
        ctx.selfAvatar.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);
        ctx.selfName.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);
        ctx.avatars.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);
        ctx.names.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);

        let selfAvatarImg = playerImgs.get(self.img);
        let avatarX, avatarY;
        switch (getPositionOfMap(self.locationX, backgroundImg.width, map.width)) {
            case 'edgeMin':
                avatarX = self.locationX;
                viewport.xMin = 0;
                viewport.xMax = map.width;
                break;
            case 'edgeMax':
                avatarX = (self.locationX - (backgroundImg.width - map.width));
                viewport.xMin = backgroundImg.width - map.width;
                viewport.xMax = viewport.xMin + map.width;
                break;
            case 'center':
                avatarX = map.width / 2;
                viewport.xMin = self.locationX - map.width / 2;
                viewport.xMax = viewport.xMin + map.width;
                break;
            default:
                break;
        }
        switch (getPositionOfMap(self.locationY, backgroundImg.height, map.height)) {
            case 'edgeMin':
                avatarY = self.locationY;
                viewport.yMin = 0;
                viewport.yMax = map.height;
                break;
            case 'edgeMax':
                avatarY = self.locationY - (backgroundImg.height - map.height);
                viewport.yMin = backgroundImg.height - map.height;
                viewport.yMax = viewport.yMin + map.height;
                break;
            case 'center':
                avatarY = map.height / 2;
                viewport.yMin = self.locationY - map.height / 2;
                viewport.yMax = viewport.yMin + map.height;
                break;
            default:
                break;
        }
        ctx.background.drawImage(backgroundImg,
            viewport.xMin, viewport.yMin,
            viewport.xMax - viewport.xMin, viewport.yMax - viewport.yMin,
            map.paddingCol / 2, map.paddingRow / 2, map.width, map.height);
        ctx.selfAvatar.drawImage(selfAvatarImg,
            self.act, 0, avatarAttr.width, avatarAttr.height,
            map.paddingCol / 2 + avatarX, map.paddingRow / 2 + avatarY - avatarAttr.unit,
            avatarAttr.width, avatarAttr.height);
        if (!users)
            return
        Object.entries(users).filter(([key, value]) => key !== socket.id && isShow(value))
            .forEach(([key, avatar]) => {
                drawAvatar(avatar, ctx.avatars)
            });
    }

    const drawOthers = () => {
        ctx.avatars.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);
        ctx.names.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow);
        Object.entries(users).filter(([key, value]) => key !== socket.id && isShow(value))
            .forEach(([key, avatar]) => {
                drawAvatar(avatar, ctx.avatars)
            });
    }

    socket.on('drawSelf', async (_self) => {
        self = _self;
        await loadPlayersImg(playerImgs, self.img);
        drawSelf(_self);
    })

    socket.on('drawOthers', async (_users) => {
        users = _users;
        for await (const user of Object.values(users)) {
            await loadPlayersImg(playerImgs, user.img);
        }
        drawOthers();
    })

    socket.on('exit', (exitedUser) => {
        delete users[exitedUser];
        drawOthers();
    })

    let move = 0;
    let dance = 0;
    const keyDownHandler = (event) => {
        if (!isHandleKeys(event.keyCode) || event.target instanceof HTMLInputElement) {
            return;
        }
        event.preventDefault();
        switch (getAction(event.keyCode)) {
            case 'right':
                self.locationX = self.locationX < backgroundImg.width - avatarAttr.width ?
                    self.locationX + avatarAttr.width : backgroundImg.width - avatarAttr.width;
                self.act = avatarAttr.width * (9 + move);
                move = (move + 1) % 3;
                break;
            case 'left':
                self.locationX = self.locationX > avatarAttr.width ?
                    self.locationX - avatarAttr.width : 0;
                self.act = avatarAttr.width * (3 + move);
                move = (move + 1) % 3;
                break;
            case 'up':
                self.locationY = self.locationY > avatarAttr.width ?
                    self.locationY - avatarAttr.width : 0;
                self.act = avatarAttr.width * (6 + move);
                move = (move + 1) % 3;
                break;
            case 'down':
                self.locationY = self.locationY < backgroundImg.height - avatarAttr.height ?
                    self.locationY + avatarAttr.width : backgroundImg.height - avatarAttr.height;
                self.act = avatarAttr.width * (0 + move);
                move = (move + 1) % 3;
                break;
            case 'dance':
                self.act = avatarAttr.width * (12 + dance);
                dance = (dance + 1) % 4;
            default:
                break;
        }
        socket.emit('move', self)
    }

    const keyUpHandler = (event) => {
        if (!isHandleKeys(event.keyCode) || event.target instanceof HTMLInputElement) {
            return;
        }
        event.preventDefault();
        switch (getAction(event.keyCode)) {
            case 'right':
                self.act = avatarAttr.width * 9;
                break;
            case 'left':
                self.act = avatarAttr.width * 3;
                break;
            case 'up':
                self.act = avatarAttr.width * 6;
                break;
            case 'down':
                self.act = avatarAttr.width * 0;
                break;
            case 'dance':
                self.act = avatarAttr.width * 0;
            default:
                break;
        }
        socket.emit('move', self)
    }
    return {
        setCanvas: function (cvs) {
            ctx = {
                background: cvs.background.getContext('2d'),
                avatars: cvs.avatars.getContext('2d'),
                names: cvs.names.getContext('2d'),
                selfAvatar: cvs.selfAvatar.getContext('2d'),
                selfName: cvs.selfName.getContext('2d')
            };
        },
        resize: function (_width, _height) {
            map.paddingRow = backgroundImg.height < _height ? _height - backgroundImg.height : 0;
            map.paddingCol = backgroundImg.width < _width ? _width - backgroundImg.width : 0;
            map.width = _width - map.paddingCol;
            map.height = _height - map.paddingRow;
        },
        run: function () {
            document.addEventListener('keydown', keyDownHandler, { capture: true });
            document.addEventListener('keyup', keyUpHandler, { capture: true });
            socket.emit('join', userInfo);
        },
        exit: function () {
            Object.values(ctx)
                .forEach((value) => value.clearRect(0, 0, map.width + map.paddingCol, map.height + map.paddingRow))
            document.removeEventListener('keydown', keyDownHandler, { capture: true });
            document.removeEventListener('keyup', keyUpHandler, { capture: true });
            socket.emit('exit');
        }
    }
}

export default drawManager;