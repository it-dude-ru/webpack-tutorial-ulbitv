import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {

	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({ template: paths.html }),  // Создаёт index.html по шаблону, подключает в него скрипты при сборке
	];

	if (isDev) {
		plugins.push(new webpack.ProgressPlugin());	// Выводит проценты прогресса во время сборки. Просто для прикола.
	}

	if (isProd) {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}));
	}

	return plugins;
}