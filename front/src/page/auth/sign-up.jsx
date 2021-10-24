import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Carousel } from '@page/carousel/index.js';
import './auth.scss'

const SignUp = (props) => {
    const authInfo = props.location.state;
    const history = useHistory();
    const [img, setImg] = useState(0);

    const signUpHandler = async () => {
        Object.assign(authInfo, { img: `/${img}` });
        const response = await fetch(`${process.env.API_URL}/auth/userinfo`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ userInfo: authInfo })
            });
        if (response.ok) {
            const resJSON = await response.json();
            if (resJSON.code === 1000) {
                history.push('/');
            }
        }
    }

    const imgHandler = (filename) => {
        setImg(filename);
    }

    return (
        <div id='signup-wrap'>
            HELLO, {props.username} <br />
            <span id='description'>CHOOSE YOUR CHARACTER</span>
            <Carousel character={imgHandler} />
            <button id='signup' onClick={signUpHandler}>
                SignUp
            </button>
        </div>
    );
}

export default SignUp;