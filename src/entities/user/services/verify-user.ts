import { error, success } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import { passwordService } from "../services/passwords";

export const verifyUser = async ({
	login,
	password,
}: {
	login: string;
	password: string;
}) => {
	const user = await userRepository.getUser({ login });

	if (!user) {
		return error("INCORRECT_LOGIN_OR_PASSWORD" as const);
	}

	const isPasswordCorrect = await passwordService.comparePasswords({
		password,
		hash: user.passwordHash,
		salt: user.salt,
	});

	if (!isPasswordCorrect) {
		return error("INCORRECT_LOGIN_OR_PASSWORD" as const);
	}

	return success(user);
};
