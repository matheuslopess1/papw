import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
}
