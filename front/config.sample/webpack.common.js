import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

export default {
	entry: {
		// app: ['@babel/polyfill', './src/app.js'],
		app: './src/app.jsx',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/', 'index.html'),
			filename: path.resolve(__dirname, 'dist/', 'index.html'),
			chunks: ['app']
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [
					path.resolve(__dirname, 'src/')
				],
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/
			},
			{
				test: /\.(scss|css)$/i,
				exclude: /\.module\.css$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.module\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { modules: true }
					},
					'sass-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			}
		],
	},
	resolve: {
		alias: {
			'@font': path.resolve(__dirname, 'src/font'),
			'@common': path.resolve(__dirname, 'src/common'),
			'@core': path.resolve(__dirname, 'src/core'),
			'@component': path.resolve(__dirname, 'src/component'),
			'@page': path.resolve(__dirname, 'src/page'),
			'@tools': path.resolve(__dirname, 'src/tools'),
			'@assets': path.resolve(__dirname, 'assets'),
		},
	}
}