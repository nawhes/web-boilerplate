import fetch from 'node-fetch';
import { AuthError } from '#services/errors/index';
import config from '#config/index';

async function github(req, res, next) {
    const { code } = req.body;
    const clientId = config.githubClientId;
    const clientSecret = config.githubClientSecret;

    const tokenUrl = `https://github.com/login/oauth/access_token`;
    const userInfoUrl = `https://api.github.com/user`;
    try {
        const { access_token: accessToken } = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            })
        }).then((res) => {
            if (res.status === 200)
                return res.json();
            throw new AuthError(`accessToken을 얻을 수 없습니다`);
        }).catch((err) => { throw err; });

        const userInfo = await fetch(userInfoUrl, {
            method: 'GET',
            headers: {
                Authorization: `token ${accessToken}`,
                'Accept': 'application/json'
            }
        }).then((res) => {
            if (res.ok)
                return res.json();
            throw new AuthError(`accessToken이 올바르지 않습니다`);
        }).catch((err) => { throw err; });

        const authResult = {
            oauthserver: 'github',
            username: userInfo.name,
            email: userInfo.email
        };

        req.authResult = authResult;
        next();
    } catch (err) {
        next(err);
    }
}

export default github;