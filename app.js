import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import webpackDevMiddleware from 'webpack-dev-middleware';
import Webpack from 'webpack';

import webpackConfig from './webpack.config.js';
import router from './router/router.js';

const compiler = Webpack.webpack(webpackConfig);
const __dirname = path.resolve();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(router);
export default app;