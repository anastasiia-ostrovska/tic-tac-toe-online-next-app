import type { PlayerEntity } from "../domain";
import { error, success } from "@/shared/lib/either";
import { gameRepository } from "../repositories/game";
import cuid from "cuid";

export const createGame = async (player: PlayerEntity) => {
	const playerGames = await gameRepository.gamesList({
		status: "gameIdle",
		players: { some: { id: player.id } },
	});

	const hasPlayerIdleGame = playerGames.some(
		(game) => game.status === "gameIdle" && game.creator.id === player.id
	);

	if (hasPlayerIdleGame) {
		return error("PLAYER_HAS_IDLE_GAME" as const);
	}

	const createdGame = await gameRepository.createGame({
		id: cuid(),
		creator: player,
		status: "gameIdle",
	});

	return success(createdGame);
};
