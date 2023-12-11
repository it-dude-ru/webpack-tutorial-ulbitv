import path from 'path';
// Модуль path - стандартный из nodejs используется для корректной обработки путей в разных операционках
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration, Port } from "webpack-dev-server"; //Типы dev server для TS
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'production' | 'development';

interface EnvVariables {
	mode: Mode;
	port: number;
}

export default (env: EnvVariables) => {  // env - объект с переменными окружения, которые передаются при запуске скрипта

const isDev = env.mode === 'development';

	const config: webpack.Configuration = {					// переменная задаётся в package.json в строках типа: "build:dev": "webpack --env mode=development"
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'index.tsx'),  // Entry point - путь до входного файла
		output: {											// Output - куда записывается результат сборки
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',			// Шаблонн имени файла для обхода кэширования
			clean: true,
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),  // Создаёт index.html по шаблону, подключает в него скрипты при сборке
			new webpack.ProgressPlugin(),	// Выводит проценты прогресса во время сборки. Просто для прикола.
		],									// На больших проектах лучше не использовать, потому что будет тормозить процесс. В общем, бесполензная фигня.
		module: {
			rules: [						// Лоадеры. Важен порядок лоадеров.
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader",
					],
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		devtool: isDev ? 'inline-source-map' : false,
		devServer: isDev ? {
			port: env.port ?? 3000,
			open: true,
		} : undefined,
	};
	return config;
};

// __dirname - глобальная константа - путь к текущему исполняемому файлу
// path.resolve - возвращает абсолютный путь на основе относительного. Видимо в данном случае просто создаёт абсолютный путь.

