import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = dotenv.config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
    )
});

if (env.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
    apiURL: process.env.API_URL,
    serverURL: process.env.SERVER_URL,
    socketioPath: '/socketio',
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubCallbackURL: process.env.GITHUB_CALLBACK_URL
};