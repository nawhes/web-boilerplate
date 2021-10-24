import React from 'react';

import halloween from '@assets/img/pumpkin.png';
import './auth.scss';

const Github = (props) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`;

    return (
        <div id='main-wrap'>
            <div id='town-title'>BMTOWN FOR HALLOWEEN</div>
            <img id='halloween' src={halloween} />
            <a id='login' href={url}>GitHub로 로그인하기</a>
        </div>
    );
}

export default Github;