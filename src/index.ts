import dotenv from "dotenv";
dotenv.config();

import env from "env-var";

import Connection from "./database/Connection";
import App from "./App";

async function main() {
	const PORT = env.get("PORT").required().asPortNumber();

	await Connection.getConnection();

	const app = new App();

	app.express.listen(PORT);
}

main();
