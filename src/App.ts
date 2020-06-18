import express from "express";
import Routes from "./Routes";

export default class App {
	public express: express.Express;

	public constructor() {
		this.express = express();

		this.middleware();
		this.routes();
	}

	private middleware() {
		this.express.use(express.json());
	}

	private routes() {
		this.express.use(Routes.getRoutes());
	}
}
