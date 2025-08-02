import cuid from "cuid";
import { error, success } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import { passwordService } from "../services/passwords";
import { DEFAULT_USER_RATING } from "../domain";

export const createUser = async ({
	login,
	password,
}: {
	login: string;
	password: string;
}) => {
	const userWithLogin = await userRepository.getUser({ login });

	if (userWithLogin) {
		return error("LOGIN_ALREADY_TAKEN" as const);
	}

	const { hash, salt } = await passwordService.hashPassword(password);

	const user = await userRepository.saveUser({
		id: cuid(),
		login,
		rating: DEFAULT_USER_RATING,
		passwordHash: hash,
		salt,
	});

	return success(user);
};
