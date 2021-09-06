import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

export default {
	entry: {
		// 'index-polyfill': ['@babel/polyfill', './src/js/index.js'],
		index: './src/js/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: '/dist'
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'dist/style.css' }),
		new HtmlWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src/js')
				],
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				],
				exclude: /node_modules/
			}
		]
	},
	devtool: 'source-map',
	mode: 'development' //'production'
}
