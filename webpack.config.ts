import path from 'path';
// Модуль path - стандартный из nodejs используется для корректной обработки путей в разных операционках
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type Mode = 'production' | 'development';

interface EnvVariables {
	mode: Mode
}

export default (env: EnvVariables) => {  // env - объект с переменными окружения, которые передаются при запуске скрипта
	const config: webpack.Configuration = {				 // переменная задаётся в package.json в строках типа: "build:dev": "webpack --env mode=development"
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
	return config;
};

// __dirname - глобальная константа - путь к текущему исполняемому файлу
// path.resolve - возвращает абсолютный путь на основе относительного. Видимо в данном случае просто создаёт абсолютный путь.

