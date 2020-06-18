import { LocaleObject } from "yup";

export default class Validator {
	private constructor() {}

	public static getCustomLocale() {
		const customLocale: LocaleObject = {
			mixed: {
				required: "Campo ${path} é obrigatório",
			},
			string: {
				trim: "Campo ${path} não pode conter espaços nos cantos do texto",
				matches: "Campo ${path} inválido",
				min: "Campo ${path} deve ter no mínimo ${min} caracteres",
				max: "Campo ${path} deve ter no máximo ${max} caracteres",
			},
		};

		return customLocale;
	}
}
