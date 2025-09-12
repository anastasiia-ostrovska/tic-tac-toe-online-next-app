import { Prisma } from "@prisma/client";
import { prisma } from "@/shared/lib/db";
import { type UserEntity } from "../domain";

export const userRepository = { saveUser, getUser };

export function saveUser(user: UserEntity): Promise<UserEntity> {
	return prisma.user.upsert({
		where: { id: user.id },
		create: user,
		update: user,
	});
}

export function getUser(where: Prisma.UserWhereInput) {
	return prisma.user.findFirst({ where });
}
