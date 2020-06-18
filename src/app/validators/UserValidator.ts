import * as yup from "yup";
import UserService from "../services/UserService";

const NAME = {
	LABEL: "nome",
	MAX: 50,
};

const PHONE_NUMBER = {
	LABEL: "telefone",
	MIN: 9,
	MAX: 11,
	MATCHES: /^[0-9]{9,11}$/,
	TEST: {
		NAME: "unique",
		MESSAGE: "Número de telefone já cadastrado",
		FUNCTION: async (phone_number: string) =>
			!phone_number ||
			!(await new UserService().getByPhoneNumber(phone_number)),
	},
};

const PASSWORD = {
	LABEL: "senha",
	MIN: 6,
	MAX: 18,
};

export default {
	store: {
		name: yup.string().label(NAME.LABEL).trim().max(NAME.MAX).required(),
		phone_number: yup
			.string()
			.label(PHONE_NUMBER.LABEL)
			.trim()
			.min(PHONE_NUMBER.MIN)
			.max(PHONE_NUMBER.MAX)
			.matches(PHONE_NUMBER.MATCHES)
			.test(
				PHONE_NUMBER.TEST.NAME,
				PHONE_NUMBER.TEST.MESSAGE,
				PHONE_NUMBER.TEST.FUNCTION
			)
			.required(),
		password: yup
			.string()
			.label(PASSWORD.LABEL)
			.min(PASSWORD.MIN)
			.max(PASSWORD.MAX)
			.required(),
	},

	update: {
		name: yup.string().label(NAME.LABEL).max(NAME.MAX),
		phone_number: yup
			.string()
			.label(PHONE_NUMBER.LABEL)
			.min(PHONE_NUMBER.MIN)
			.max(PHONE_NUMBER.MAX)
			.matches(PHONE_NUMBER.MATCHES)
			.test(
				PHONE_NUMBER.TEST.NAME,
				PHONE_NUMBER.TEST.MESSAGE,
				PHONE_NUMBER.TEST.FUNCTION
			),
		password: yup
			.string()
			.label(PASSWORD.LABEL)
			.min(PASSWORD.MIN)
			.max(PASSWORD.MAX),
	},
};
