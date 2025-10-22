import { GameEntity, getCurrentStep } from "@/entities/game";

export function GameStatus({ game }: { game: GameEntity }) {
	switch (game.status) {
		case "gameIdle":
			return <p className="text-lg">Waiting for second player</p>;
		case "gameInProgress": {
			const currentSymbol = getCurrentStep(game);
			return <p className="text-lg">Current step: {currentSymbol}</p>;
		}
		case "gameOver":
			const currentSymbol = getCurrentStep(game);
			return <p className="text-lg">Winner: {currentSymbol}</p>;
		case "gameOverDraw":
			return <p className="text-lg">Friendship is the winner!</p>;
	}
}
