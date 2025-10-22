import { GameEntity } from "@/entities/game";

export function GamePlayers({ game }: { game: GameEntity }) {
	const firstPlayer =
		game.status === "gameIdle" ? game.creator : game.players[0];

	const secondPlayer = game.status === "gameIdle" ? undefined : game.players[1];

	return (
		<div className="flex flex-row gap-4 justify-between text-lg">
			<p>
				x - {firstPlayer.login} : {firstPlayer.rating}
			</p>
			<p>
				o -
				{secondPlayer
					? ` ${secondPlayer?.login} : ${secondPlayer?.rating}`
					: " Waiting.."}
			</p>
		</div>
	);
}
