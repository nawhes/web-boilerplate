import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dotenv from 'dotenv-webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __dirname = path.resolve();

export default merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		compress: true,
		static: path.resolve(__dirname, 'dist'),
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new dotenv({
			path: path.resolve(__dirname, '.env.dev')
		})
	],
})