import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Loading from '@common/loading/loading.jsx';

const GithubCallbackPage = () => {
    const history = useHistory();
    const searchParams = new URLSearchParams(useLocation().search);
    const code = searchParams.get('code');

    const getAccessToken = async (code) => {
        const response = await fetch(`${process.env.API_URL}/auth/github`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ code })
            })
        if (response.ok) {
            const resJSON = await response.json();
            if(resJSON.code === 2000){
                return history.push({
                    pathname : '/signUp',
                    state: resJSON.data
                });
            }
            return history.push('/');

        }
    };

    useEffect(() => {
        getAccessToken(code);
    }, []);

    return (<Loading />);
}

export default GithubCallbackPage;