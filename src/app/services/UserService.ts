import { getCustomRepository, DeepPartial } from "typeorm";

import UserRepository from "../repositories/UserRepository";
import User from "../entities/User";

export default class UserService {
	private repository = getCustomRepository(UserRepository);

	public get(id: string) {
		return this.repository.findOne(id);
	}

	public getByPhoneNumber(phone_number: string) {
		return this.repository.findOne({ phone_number });
	}

	public create(body: DeepPartial<User>) {
		const user_created = this.repository.create(body);

		return this.repository.save(user_created);
	}

	public async update(id: string, body: DeepPartial<User>) {
		const user = await this.repository.findOne(id);

		if (!user) return undefined;

		this.repository.merge(user, body);

		return await this.repository.save(user);
	}

	public async destroy(id: string) {
		const user = await this.repository.findOne(id);

		if (!user) return false;

		await this.repository.delete(id);

		return true;
	}

	public async generateToken(phone_number: string, password: string) {
		const user = await this.repository.findOne({ phone_number });

		if (!user) return undefined;

		const password_checked = await user.checkPassword(password);

		if (!password_checked) return undefined;

		return user.generateToken();
	}
}
