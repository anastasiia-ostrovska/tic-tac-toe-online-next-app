import type { Game, Prisma, User } from "@prisma/client";
import type { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import { removePassword } from "@/shared/lib/password";
import { prisma } from "@/shared/lib/db";
import { z } from "zod";

export const gameRepository = { gamesList };

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
	const games = await prisma.game.findMany({
		where,
		include: {
			winner: true,
			players: true,
		},
	});

	return games.map(dbGameToGameEntity);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
	game: Game & { players: User[]; winner?: User | null }
): GameEntity {
	const players = game.players.map(removePassword);

	switch (game.status) {
		case "gameIdle": {
			const [creator] = players;
			if (!creator) {
				throw new Error("No creator found. Creator must be in 'gameIdle'");
			}
			return {
				id: game.id,
				creator: creator,
				status: game.status,
			} satisfies GameIdleEntity;
		}
		case "gameInProgress":
		case "gameOverDraw": {
			return {
				id: game.id,
				players: players,
				status: game.status,
				field: fieldSchema.parse(game.field),
			};
		}
		case "gameOver": {
			if (!game.winner) {
				throw new Error(
					"No winner when not draw. Winner must be in 'gameOver'"
				);
			}
			return {
				id: game.id,
				players: players,
				field: fieldSchema.parse(game.field),
				status: game.status,
				winner: removePassword(game.winner),
			} satisfies GameOverEntity;
		}
	}
}
