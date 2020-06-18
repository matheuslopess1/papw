import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import Validator from "../../config/Validator";

yup.setLocale(Validator.getCustomLocale());

export default function validate(fields: yup.ObjectSchemaDefinition<object>) {
	const schema = yup.object().shape(fields);

	return (req: Request, res: Response, next: NextFunction) =>
		schema
			.validate(req.body)
			.then(() => next())
			.catch((error: yup.ValidationError) =>
				res.status(400).json({ message: error.message })
			);
}
