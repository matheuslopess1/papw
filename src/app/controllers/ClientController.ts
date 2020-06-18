import { Request, Response } from "express";
import ClientService from "../services/ClientService";
import UserDTO from "../DTOs/UserDTO";
import ClientDTO from "../DTOs/ClientDTO";

export default class ClientController {
	private service = new ClientService();

	public index = async (req: Request, res: Response) => {
		const { userId } = res.locals;

		const clients = await this.service.getAll(userId);

		const clientsDTOs = clients?.map((client) => new ClientDTO(client));

		return res.json(clientsDTOs);
	};

	public show = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { userId } = res.locals;

		const client = await this.service.get(id, userId);

		if (client) {
			const clientDTO = new ClientDTO(client);

			return res.json(clientDTO);
		}

		return res.status(404).json();
	};

	public store = async (req: Request, res: Response) => {
		const { name, phone_number, zip_code, address_number } = req.body;
		const { userId } = res.locals;
		const data = { name, phone_number, zip_code, address_number };

		const client = await this.service.create(data, userId);

		const clientDTO = new ClientDTO(client);

		return res.status(201).json(clientDTO);
	};

	public update = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { userId } = res.locals;
		const { name, phone_number, zip_code, address_number } = req.body;
		const data = { name, phone_number, zip_code, address_number };

		const client = await this.service.update(id, data, userId);

		if (client) {
			const clientDTO = new ClientDTO(client);

			return res.json(clientDTO);
		}

		return res.status(404).json();
	};

	public destroy = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { userId } = res.locals;

		const destroyed = await this.service.destroy(id, userId);

		return res.status(destroyed ? 204 : 404).json();
	};
}
