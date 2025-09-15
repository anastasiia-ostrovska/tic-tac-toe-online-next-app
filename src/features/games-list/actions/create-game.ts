"use server";

import { redirect } from "next/navigation";
import { createGame } from "@/entities/game/server";
import { error } from "@/shared/lib/either";
import { getCurrentUser } from "@/entities/user/server";

export const createGameAction = async () => {
	const user = await getCurrentUser();

	if (!user) {
		return error("USER_NOT_FOUND" as const);
	}

	const newGame = await createGame(user);

	if (newGame.type === "success") {
		redirect(`/game/${newGame.value.id}`);
	}

	return newGame;
};
