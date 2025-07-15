import type { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game";

export const getGamesIdle = async (): Promise<GameIdleEntity[]> => {
	const games = await gameRepository.gamesList({ status: "gameIdle" });
	return games as GameIdleEntity[];
};
