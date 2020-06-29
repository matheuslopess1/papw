import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "env-var";

import Client from "./Client";

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 50, nullable: false })
	name!: string;

	@Column({ length: 11, nullable: false, unique: true })
	phone_number!: string;

	@Column({ length: 60, nullable: false })
	password!: string;

	@OneToMany(() => Client, (client) => client.user)
	clients!: Client[];

	checkPassword(password: string) {
		return bcrypt.compare(password, this.password);
	}

	generateToken() {
		const SECRET = env.get("SECRET").required().asString();

		return jwt.sign(String(this.id), SECRET);
	}

	async hashPassword() {
		if (this.password == null)
			throw new Error("Não é possível encriptar uma senha vazia");

		this.password = await bcrypt.hash(this.password, 8);
	}
}
