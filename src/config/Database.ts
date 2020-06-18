import path from "path";
import { ConnectionOptions } from "typeorm";

export default class Database {
	private constructor() {}

	public static getConfig() {
		const config: ConnectionOptions = {
			type: "sqlite",
			database: path.resolve(__dirname, "..", "database", "database.sqlite"),
			entities: [path.resolve(__dirname, "..", "app", "entities", "*.ts")],
			synchronize: true,
			logging: false,
		};

		return config;
	}
}
