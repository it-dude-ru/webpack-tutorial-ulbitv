const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const path = require('path');
// Модуль path - стандартный из nodejs используется для корректной обработки путей в разных операционках
const webpack = require('webpack');


module.exports = (env) => {  // env - объект с переменными окружения, которые передаются при запуске скрипта
	return {				 // переменная задаётся в package.json в строках типа: "build:dev": "webpack --env mode=development"
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'index.ts'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),  // Создаёт index.html по шаблону, подключает в него скрипты при сборке
			new webpack.ProgressPlugin(), // Выводит проценты прогресса во время сборки.
		],
		module: {
			rules: [
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
	};
};

// __dirname - глобальная константа - путь к текущему исполняемому файлу
// path.resolve - возвращает абсолютный путь на основе относительного. Видимо в данном случае просто создаёт абсолютный путь.

