import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ClientController from "./app/controllers/ClientController";

import auth from "./app/middlewares/auth";
import validate from "./app/middlewares/validate";

import UserValidator from "./app/validators/UserValidator";
import ClientValidator from "./app/validators/ClientValidator";

export default class Routes {
	private constructor() {}

	public static getRoutes() {
		const routes = Router();

		const userController = new UserController();
		const sessionController = new SessionController();
		const clientController = new ClientController();

		// Rota(s) de usuário
		routes.post("/users", validate(UserValidator.store), userController.store);

		// Rota(s) de autenticação
		routes.post("/sessions", sessionController.store);

		// Middleware de autenticação
		// A partir daqui as próximas rotas terão que passar por este middleware
		routes.use(auth);

		// Rota(s) de usuário (autenticado)
		routes.get("/users/me", userController.show);

		routes.put(
			"/users/me",
			validate(UserValidator.update),
			userController.update
		);

		routes.delete("/users/me", userController.destroy);

		// Rota(s) de cliente
		routes.get("/clients", clientController.index);
		routes.get("/clients/:id", clientController.show);

		routes.post(
			"/clients",
			validate(ClientValidator.store),
			clientController.store
		);

		routes.put(
			"/clients/:id",
			validate(ClientValidator.update),
			clientController.update
		);

		routes.delete("/clients/:id", clientController.destroy);

		return routes;
	}
}
