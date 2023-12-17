// Файл нужен для правильной работы импорта модулей scss
// В конструкциях типа: import classes from ".\App.module.scss";
// Подробнее: https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack

declare module '*.module.scss' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.svg" {
	import React from "react";
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}