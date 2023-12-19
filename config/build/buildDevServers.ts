import type { Configuration as DevServerConfiguration, Port } from "webpack-dev-server"; //Типы dev server для TS
import { BuildOptions } from "./types/types";

export function buildDevServers(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port ?? 3000,
		open: true,
		historyApiFallback: true, // Работает для дев-сервера. При деплое нужно проксировать запросы в index.html
		hot: true, // Обновление элементов страницы без перезагрузки (Hot Module Replacement)
	};
}