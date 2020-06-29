import { EventSubscriber, EntitySubscriberInterface } from "typeorm";
import { InsertEvent, UpdateEvent } from "typeorm";

import User from "../entities/User";

@EventSubscriber()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
	listenTo() {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>) {
		await event.entity.hashPassword();
	}

	async beforeUpdate(event: UpdateEvent<User>) {
		if (event.entity.password !== event.databaseEntity.password)
			await event.entity.hashPassword();
	}
}
