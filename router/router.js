import express from 'express';
import path from 'path';
import {read} from '../model/model.js';

const router = express.Router();
const __dirname = path.resolve();

router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

router.get('/s', async (req, res) => {
    const result = await read();
	res.format({
		'text/html': function () {
			res.sendFile(path.resolve(__dirname, "dist/index.html"));
		},
		'application/json': function () {
			res.send(result);
		},
		'default': function () {
			res.status(406).send('Not Acceptable');
		}
	});
});

export default router;