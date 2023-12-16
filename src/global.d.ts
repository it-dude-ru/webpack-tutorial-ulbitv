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