import User from "../entities/User";

export default class UserDTO {
	id!: number;
	name!: string;
	phone_number!: string;

	constructor(user?: User) {
		if (user) {
			this.id = user.id;
			this.name = user.name;
			this.phone_number = user.phone_number;
		}
	}
}
