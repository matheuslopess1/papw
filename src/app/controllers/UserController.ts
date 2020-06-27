import { Request, Response } from "express";
import UserService from "../services/UserService";
import UserDTO from "../DTOs/UserDTO";

export default class UserController {
	private service = new UserService();

	public show = async (req: Request, res: Response) => {
		const { userId } = res.locals;

		const user = await this.service.get(userId);

		if (user) {
			const userDTO = new UserDTO(user);

			return res.json(userDTO);
		}

		return res.status(404).json();
	};

	public store = async (req: Request, res: Response) => {
		const { name, phone_number, password } = req.body;

		const user = await this.service.create({ name, phone_number, password });

		const userDTO = new UserDTO(user);

		return res.status(201).json(userDTO);
	};

	public update = async (req: Request, res: Response) => {
		const { userId } = res.locals;
		const { name, phone_number, password } = req.body;
		const data = { name, phone_number, password };

		const user = await this.service.update(userId, data);

		if (!user) return res.status(404).json();

		const userDTO = new UserDTO(user);

		return res.json(userDTO);
	};

	public destroy = async (req: Request, res: Response) => {
		const { userId } = res.locals;

		const destroyed = await this.service.destroy(userId);

		return res.status(destroyed ? 204 : 404).json();
	};
}
