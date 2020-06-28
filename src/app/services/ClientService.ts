import { getCustomRepository, DeepPartial } from "typeorm";

import ClientRepository from "../repositories/ClientRepository";
import UserRepository from "../repositories/UserRepository";
import Client from "../entities/Client";
import User from "../entities/User";

export default class ClientService {
	private userRepository = getCustomRepository(UserRepository);
	private clientRepository = getCustomRepository(ClientRepository);

	public async getAll(userId: string) {
		if (userId == null) return undefined;

		const id = Number(userId);

		if (isNaN(id)) return undefined;

		const user = new User();
		user.id = Number(userId);

		return await this.clientRepository.find({ user });
	}

	public async get(id: string, userId: string) {
		const client = await this.clientRepository.findOne(id, {
			relations: ["user"],
		});

		if (client && client.user.id == Number(userId)) return client;

		return undefined;
	}

	public async create(body: DeepPartial<Client>, userId: string) {
		if (userId == null) return undefined;

		const id = Number(userId);

		if (isNaN(id)) return undefined;

		const user = new User();

		user.id = id;

		if (user) {
			const client_created = this.clientRepository.create({ ...body, user });

			return await this.clientRepository.save(client_created);
		}

		return undefined;
	}

	public async update(id: string, body: DeepPartial<Client>, userId: string) {
		const client = await this.clientRepository.findOne(id, {
			relations: ["user"],
		});

		if (!client || client.user.id !== Number(userId)) return undefined;

		this.clientRepository.merge(client, body);

		return await this.clientRepository.save(client);
	}

	public async destroy(id: string, userId: string) {
		const client = await this.clientRepository.findOne(id, {
			relations: ["user"],
		});

		if (!client || client.user.id !== Number(userId)) return false;

		await this.clientRepository.delete(id);

		return true;
	}
}
