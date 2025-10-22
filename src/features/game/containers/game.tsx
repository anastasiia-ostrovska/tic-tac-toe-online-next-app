import type { GameId } from "@/kernel/ids";
import type { GameOverEntity } from "@/entities/game";
import { GameLayout } from "../ui/layout";
import { GamePlayers } from "@/features/game/ui/players";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";

export function Game({ gameId }: { gameId: GameId }) {
	const game: GameOverEntity = {
		id: gameId,
		players: [
			{
				id: "1",
				login: "Test Player",
				rating: 1000,
			},
			{
				id: "2",
				login: "Another Player",
				rating: 2000,
			},
		],
		winner: {
			id: "1",
			login: "Test Player",
			rating: 1000,
		},
		status: "gameOver",
		field: [null, "X", null, "O", null, "X", null, "O", null],
	};

	return (
		<div>
			<GameLayout
				players={<GamePlayers game={game} />}
				status={<GameStatus game={game} />}
				field={<GameField game={game} />}
			/>
		</div>
	);
}
