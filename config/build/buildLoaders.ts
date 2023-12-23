import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLosder";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

	const isDev = options.mode === 'development';

	// Лоадеры. Важен порядок лоадеров. Порядок задаётся в return

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	};

	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [{ loader: '@svgr/webpack', options: { icon: true } }],
	};

	const cssLoaedrWithModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			cssLoaedrWithModules,
			// Compiles Sass to CSS
			"sass-loader",
		],
	};

	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: isDev // Отключает проверку типов для ускорения сборки.
				}						 // Использовать в связке с ForkTsCheckerWebpackPlugin
			}
		],
		exclude: /node_modules/,
	};


	// Настройки babel так же можно сделать в файле babel.config.json
	// В корне проекта есть пример.
	const babelLoader = buildBabelLoader(options);

	return [
		scssLoader,
		// tsLoader,
		babelLoader,
		assetLoader,
		svgrLoader,
	];
}