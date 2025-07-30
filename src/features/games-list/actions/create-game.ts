"use server";

import { redirect } from "next/navigation";
import { createGame } from "@/entities/game/server";
import { prisma } from "@/shared/lib/db";
import { error } from "@/shared/lib/either";

export const createGameAction = async () => {
	const user = await prisma.user.findFirst();

	if (!user) {
		return error("USER_NOT_FOUND" as const);
	}

	const newGame = await createGame(user);

	if (newGame.type === "success") {
		redirect(`/game/${newGame.value.id}`);
	}

	return newGame;
};
