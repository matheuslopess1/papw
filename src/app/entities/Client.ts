import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "./User";

@Entity()
export default class Client {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	phone_number!: string;

	@Column()
	zip_code!: string;

	@Column()
	address_number!: string;

	@ManyToOne(() => User, (user) => user.clients)
	user!: User;
}
