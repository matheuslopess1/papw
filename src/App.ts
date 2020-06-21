import express from "express";
import cors from "cors";
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
		this.express.use(cors());
	}

	private routes() {
		this.express.use(Routes.getRoutes());
	}
}
