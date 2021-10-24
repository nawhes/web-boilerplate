import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

import { Sidebar } from './sidebar/index.js';
import { SidebarNav } from './sidebarnav/index.js';
import Canvas from './canvas/canvas.jsx'
import Loading from '@common/loading/loading.jsx';

import drawManager from './canvas/draw-manager.js';
import chatManager from './sidebar/chat/chat-manager.js';
import participantManager from './sidebar/participant/participant-manager.js';
import addImgProcess from '@tools/addImgProcess.js';

import './town.scss';
import style from './town.module.scss';

const loadingUserInfo = (setUserInfo) => {
    fetch(`${process.env.API_URL}/auth/userinfo`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
    ).then((res) => {
        if (res.ok) {
            res.json().then((res) => setUserInfo(JSON.parse(JSON.stringify(res.data))))
        }
    });
}

const loadingPrevChat = (setPrevChat) => {
    fetch(`${process.env.API_URL}/chat/message`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
    ).then((res) => {
        if (res.ok) {
            res.json().then((res) => setPrevChat(JSON.parse(JSON.stringify(res.data))))
        }
    });
}

const loadingBackgroundImg = (setBackgroundImg) => {
    addImgProcess('/templateTikiBar.png').then((img) => {
        setBackgroundImg(img);
    }).catch((err) => {
        console.error(err);
    })
}

const loadingSocket = (setSocket) => {
    const socket = io(process.env.SERVER_URL, { path: '/socketio' });
    setSocket(socket);
}

const Town = (props) => {
    const [backgroundImg, setBackgroundImg] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);
    const [prevChat, setPrevChat] = useState(undefined);
    const [socket, setSocket] = useState(undefined);
    const [artist, setArtist] = useState(undefined);
    const [frontman, setFrontman] = useState(undefined);
    const [twitter, setTwitter] = useState(undefined);

    const [icon, setIcon] = useState('participant');

    useEffect(() => {
        loadingSocket(setSocket);
        loadingBackgroundImg(setBackgroundImg);
        loadingPrevChat(setPrevChat);
        loadingUserInfo(setUserInfo);
    }, []);
    useEffect(() => {
        if (!userInfo || !socket || !backgroundImg || !prevChat)
            return;
        setArtist(drawManager(socket, backgroundImg, userInfo));
        setTwitter(chatManager(socket, prevChat));
        setFrontman(participantManager(socket));
    }, [userInfo, socket, backgroundImg, prevChat]);

    if (!artist || !twitter || !frontman) {
        return (<Loading />)
    }

    return (
        <main className={style.main}>
            <div id='sidebar-wrap'>
                <SidebarNav icon={icon} setIcon={setIcon} />
                <Sidebar
                    icon={icon}
                    setIcon={setIcon}
                    twitter={twitter}
                    frontman={frontman}
                    username={userInfo.username}
                />
            </div>
            <Canvas artist={artist} />
        </main>
    );
}

export default Town;