import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import webpackDevMiddleware from 'webpack-dev-middleware';
import Webpack from 'webpack';

import webpackConfig from './webpack.config.js';
import indexRouter from './route/index.js';
import usersRouter from './route/users.js';

const compiler = Webpack.webpack(webpackConfig);
const __dirname = path.resolve();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, "dist/index.html"));
});
  
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;