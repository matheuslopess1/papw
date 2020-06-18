import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository, DeepPartial } from "typeorm";
import env from "env-var";
import jwt from "jsonwebtoken";
import User from "../entities/User";

export default class UserService {
	private repository = getCustomRepository(UserRepository);

	public async get(id: string) {
		return await this.repository.findOne(id);
	}

	public async getByPhoneNumber(phone_number: string) {
		return await this.repository.findOne({ phone_number });
	}

	public async create(body: DeepPartial<User>) {
		if (body.password) {
			body.password = await bcrypt.hash(body.password, 10);
		}

		const user_created = this.repository.create(body);

		return await this.repository.save(user_created);
	}

	public async update(id: string, body: DeepPartial<User>) {
		const user = await this.repository.findOne(id);

		if (!user) {
			return null;
		}

		if (body.password) {
			body.password = await bcrypt.hash(body.password, 10);
		}

		this.repository.merge(user, body);

		return await this.repository.save(user);
	}

	public async destroy(id: string) {
		const user = await this.repository.findOne(id);

		if (!user) {
			return false;
		}

		await this.repository.delete(id);

		return true;
	}

	public async generateToken(phone_number: string, password: string) {
		const user = await this.repository.findOne({ phone_number });

		if (!user) {
			return null;
		}

		const password_checked = await bcrypt.compare(password, user.password);

		if (!password_checked) {
			return null;
		}

		const SECRET = env.get("SECRET").required().asString();

		return jwt.sign(String(user.id), SECRET);
	}
}
