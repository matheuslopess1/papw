import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "env-var";

import Client from "./Client";

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	phone_number!: string;

	@Column()
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
}
