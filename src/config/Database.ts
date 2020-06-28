import { ConnectionOptions } from "typeorm";
import env from "env-var";

export default class Database {
	private constructor() {}

	public static getConfig() {
		const DATABASE_URL = env.get("DATABASE_URL").required().asUrlString();

		const config: ConnectionOptions = {
			type: "postgres",
			url: DATABASE_URL,
			synchronize: true,
			logging: false,
			entities: [__dirname + "/../app/entities/*.{ts,js}"],
			subscribers: [__dirname + "/../app/subscribers/*.{ts,js}"],
		};

		return config;
	}
}
