import * as yup from "yup";

const NAME = {
	LABEL: "nome",
	MAX: 50,
};

const PHONE_NUMBER = {
	LABEL: "telefone",
	MIN: 9,
	MAX: 11,
	MATCHES: /^[0-9]{9,11}$/,
};

const ZIP_CODE = {
	LABEL: "CEP",
	LENGTH: 8,
	MATCHES: /^[0-9]{8}$/,
};

const ADDRESS_NUMBER = {
	LABEL: "número do endereço",
	MIN: 1,
	MAX: 5,
	MATCHES: /^[0-9]{1,5}$/,
};

export default {
	store: {
		name: yup.string().label(NAME.LABEL).max(NAME.MAX).required(),
		phone_number: yup
			.string()
			.label(PHONE_NUMBER.LABEL)
			.min(PHONE_NUMBER.MIN)
			.max(PHONE_NUMBER.MAX)
			.matches(PHONE_NUMBER.MATCHES)
			.required(),
		zip_code: yup
			.string()
			.label(ZIP_CODE.LABEL)
			.length(ZIP_CODE.LENGTH)
			.matches(ZIP_CODE.MATCHES)
			.required(),
		address_number: yup
			.string()
			.label(ADDRESS_NUMBER.LABEL)
			.min(ADDRESS_NUMBER.MIN)
			.max(ADDRESS_NUMBER.MAX)
			.matches(ADDRESS_NUMBER.MATCHES)
			.required(),
	},
	update: {
		name: yup.string().label(NAME.LABEL).max(NAME.MAX).required(),
		phone_number: yup
			.string()
			.label(PHONE_NUMBER.LABEL)
			.min(PHONE_NUMBER.MIN)
			.max(PHONE_NUMBER.MAX)
			.matches(PHONE_NUMBER.MATCHES),
		zip_code: yup
			.string()
			.label(ZIP_CODE.LABEL)
			.length(ZIP_CODE.LENGTH)
			.matches(ZIP_CODE.MATCHES),
		address_number: yup
			.string()
			.label(ADDRESS_NUMBER.LABEL)
			.min(ADDRESS_NUMBER.MIN)
			.max(ADDRESS_NUMBER.MAX)
			.matches(ADDRESS_NUMBER.MATCHES),
	},
};
