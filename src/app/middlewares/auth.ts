import { Request, Response, NextFunction } from "express";
import env from "env-var";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";

export default function auth(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (authorization) {
		const [type, token] = authorization.split(" ", 2);

		if (type === "Bearer" && token) {
			try {
				const SECRET = env.get("SECRET").required().asString();

				const userId = jwt.verify(token, SECRET);

				const userService = new UserService();

				const user = userService.get(String(userId));

				if (user) {
					res.locals = { ...res.locals, userId };

					return next();
				}
			} catch (err) {
				//
			}
		}
	}

	return res.status(401).json({ message: "Token inválido ou expirado" });
}
