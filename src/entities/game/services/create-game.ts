import type { PlayerEntity } from "../domain";
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
		return {
			type: "error",
			error: "CAN_CREATE_ONLY_ONE_GAME",
			message: "Player already have an idle game.",
		};
	}

	return await gameRepository.createGame({
		id: cuid(),
		creator: player,
		status: "gameIdle",
	});
};
