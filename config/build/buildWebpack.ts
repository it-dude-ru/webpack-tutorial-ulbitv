import webpack from "webpack";
import { buildDevServers } from "./buildDevServers";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {

	const {mode, paths} = options;

	const isDev = mode === 'development';

	return {					// переменная задаётся в package.json в строках типа: "build:dev": "webpack --env mode=development"
		mode: mode ?? 'development',
		entry: paths.entry,  // Entry point - путь до входного файла
		output: {											// Output - куда записывается результат сборки
			path: paths.output,
			filename: '[name].[contenthash].js',			// Шаблонн имени файла для обхода кэширования
			clean: true,
		},
		plugins: buildPlugins(options),									// На больших проектах лучше не использовать, потому что будет тормозить процесс. В общем, бесполензная фигня.
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev ? 'inline-source-map' : false,
		devServer: isDev ? buildDevServers(options) : undefined,
	};
}

// __dirname - глобальная константа - путь к текущему исполняемому файлу
// path.resolve - возвращает абсолютный путь на основе относительного. Видимо в данном случае просто создаёт абсолютный путь.
