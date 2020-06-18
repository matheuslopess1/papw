import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class SessionController {
	private service = new UserService();

	public store = async (req: Request, res: Response) => {
		const { phone_number, password } = req.body;

		const token = await this.service.generateToken(phone_number, password);

		return token
			? res.json({ token })
			: res.status(400).json({ message: "Usuário e/ou senha inválido(s)" });
	};
}
