import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "./User";

@Entity()
export default class Client {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 50, nullable: false })
	name!: string;

	@Column({ length: 11, nullable: false })
	phone_number!: string;

	@Column({ length: 8, nullable: false })
	zip_code!: string;

	@Column({ length: 5, nullable: false })
	address_number!: string;

	@ManyToOne(() => User, (user) => user.clients)
	user!: User;
}
