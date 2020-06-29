import User from "./User";

describe("Usuário", () => {
	it("deve combinar a senha com sua versão encriptada", async () => {
		const password = "123456";

		const user = new User();
		user.password = password;
		await user.hashPassword();

		const isPasswordChecked = await user.checkPassword(password);

		expect(isPasswordChecked).toBe(true);
	});

	it("não deve combinar a senha encriptada com uma outra qualquer", async () => {
		const password = "123456";

		const user = new User();
		user.password = password;
		await user.hashPassword();

		const isPasswordChecked = await user.checkPassword("654321");

		expect(isPasswordChecked).toBe(false);
	});

	it("não deve encriptar uma senha não definida", async () => {
		try {
			const user = new User();
			await user.hashPassword();
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
		}
	});
});
