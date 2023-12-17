import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import img01 from "@/assets/img01.jpeg";
import Calendar from "@/assets/calendar.svg";
import User from "@/assets/user.svg";

export const App = () => {
	const [count, setCount] = useState<number>(0);

	const increment = () => setCount(prev => prev + 1);

	return (
		<div>
			<div>
				<img src={img01} width={250} height={250} alt="" />
			</div>
			<div>
				<Calendar fill={'red'} width={50} height={50} />
			</div>
			<div>
				<User width={50} height={50} />
			</div>
			<Link to={'/about'}>about</Link>
			<br/>
			<Link to={'/shop'}>shop</Link>
			<h1 className={classes.value}>{count}</h1>
			<button className={classes.button} onClick={increment}>Inc</button>
			<Outlet />
		</div>
	);
};