import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Loading from '@common/loading/loading.jsx';
import { getCookie } from '@tools/cookie.js';

import './home.scss';
import ghost from '@assets/img/ghost.png';

const Home = (props) => {
    const [userInfo, setUserInfo] = useState(undefined);

    const sessionId = getCookie('connect.sid');
    if (!sessionId) {
        return (<Redirect to='/auth' />);
    }

    const getUserInfo = async () => {
        const response = await fetch(`${process.env.API_URL}/auth/userinfo`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
        if (response.ok) {
            setUserInfo((await response.json()).data);
        }
    }
    useEffect(() => {
        getUserInfo();
    }, []);

    if (!userInfo) {
        return (<Loading />)
    }
    return (
        <div id='home-wrap' >
            <span>HI, {userInfo.username}</span>
            <img id='ghost' src={ghost} />
            <Link id='goTown' to={{
                pathname: '/town',
            }}>Go Town</Link>
        </div>
    );
}

export default Home;