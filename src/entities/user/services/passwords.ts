import { pbkdf2, randomBytes } from "node:crypto";

export const passwordService = { hashPassword, comparePasswords };

async function hashPassword(
	password: string,
	salt = randomBytes(16).toString("hex")
) {
	const hash = await new Promise<Buffer>((resolve, reject) => {
		pbkdf2(password, salt, 1000, 64, `sha512`, (error, hash) => {
			error ? reject(error) : resolve(hash);
		});
	});

	return {
		hash: hash.toString(`hex`),
		salt,
	};
}

async function comparePasswords({
	hash,
	password,
	salt,
}: {
	hash: string;
	password: string;
	salt: string;
}) {
	const hashedPassword = await hashPassword(password, salt);
	return hash === hashedPassword.hash;
}
