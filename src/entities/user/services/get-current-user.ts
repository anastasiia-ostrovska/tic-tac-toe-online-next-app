import { sessionService } from "./session";
import { userRepository } from "../repositories/user";

export const getCurrentUser = async () => {
	const { session } = await sessionService.verifySession();
	return userRepository.getUser({ id: session.id });
};
