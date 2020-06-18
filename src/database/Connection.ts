import { createConnection, Connection as Conn } from "typeorm";
import DatabaseConfig from "../config/Database";

export default class Connection {
	private static connection: Conn;

	private constructor() {}

	public static async getConnection() {
		if (!Connection.connection) {
			Connection.connection = await createConnection(
				DatabaseConfig.getConfig()
			);
		}

		return Connection.connection;
	}
}
