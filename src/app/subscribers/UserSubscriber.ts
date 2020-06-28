import { EventSubscriber, EntitySubscriberInterface } from "typeorm";
import { InsertEvent, UpdateEvent } from "typeorm";
import bcrypt from "bcryptjs";

import User from "../entities/User";

@EventSubscriber()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
	listenTo() {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>) {
		event.entity.password = await bcrypt.hash(event.entity.password, 8);
	}

	async beforeUpdate(event: UpdateEvent<User>) {
		if (event.entity.password !== event.databaseEntity.password) {
			event.entity.password = await bcrypt.hash(event.entity.password, 8);
		}
	}
}
