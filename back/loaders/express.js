import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import _MySQLStore from 'express-mysql-session';
import path from 'path';

import api from '#api/index';
import config from '#config/index';

export default async ({ app }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    app.enable('trust proxy');

    app.use(cors({ origin: config.clientURL, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use('/static', express.static(path.join(path.resolve(), '/public')));

    const MySQLStore = _MySQLStore(session);
    const sessionStore = new MySQLStore(config.sessionStore)
    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        store: sessionStore,
        cookie: {
            path: '/',
            httpOnly: false,
            secure: false,
            maxAge: 1000000
        }
    }));

    app.use('/api', api);

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'AuthError') {
            return res.status(err.status).send({ code: 5000, message: err.message }).end();
        }
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};