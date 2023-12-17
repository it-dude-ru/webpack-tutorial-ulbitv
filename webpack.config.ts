import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/build/builsWebpack';
import { BuildMode, BuildPaths } from './config/build/types/types';

interface EnvVariables {
	mode: BuildMode;
	port: number;
	analyzer?: boolean;
}

export default (env: EnvVariables) => {  // env - объект с переменными окружения, которые передаются при запуске скрипта

	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
	};

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
		analyzer: env.analyzer
	});
	return config;
};


