import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const __dirname = path.resolve();

export default {
	entry: {
		'app-polyfill': ['@babel/polyfill', './src/js/app.js'],
		app: './src/js/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'css/style.css' })
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