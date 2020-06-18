import Client from "../entities/Client";

export default class ClientDTO {
	id!: number;
	name!: string;
	phone_number!: string;
	zip_code!: string;
	address_number!: string;

	constructor(client?: Client) {
		if (client) {
			this.id = client.id;
			this.name = client.name;
			this.phone_number = client.phone_number;
			this.zip_code = client.zip_code;
			this.address_number = client.address_number;
		}
	}
}
