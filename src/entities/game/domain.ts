// Game
import { GameId, UserId } from "@/kernel/ids";

export type GameEntity =
	| GameIdleEntity
	| GameInProgressEntity
	| GameOverEntity
	| GameOverDrawEntity;

export type GameIdleEntity = {
	id: GameId;
	creator: PlayerEntity;
	field: Field;
	status: "gameIdle";
};

export type GameInProgressEntity = {
	id: GameId;
	players: PlayerEntity[];
	field: Field;
	status: "gameInProgress";
};

export type GameOverEntity = {
	id: GameId;
	players: PlayerEntity[];
	field: Field;
	status: "gameOver";
	winner: PlayerEntity;
};

export type GameOverDrawEntity = {
	id: GameId;
	players: PlayerEntity[];
	field: Field;
	status: "gameOverDraw";
};

export type PlayerEntity = {
	id: UserId;
	login: string;
	rating: number;
};

// Field
export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GameSymbol = {
	X: "X" as const,
	O: "O" as const,
};

export const getCurrentStep = (
	game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity
) => {
	const stepsAlreadyMade = game.field.filter((cell) => cell !== null).length;
	return stepsAlreadyMade % 2 === 0 ? GameSymbol.X : GameSymbol.O;
};

export const getNextStep = (currentStep: GameSymbol) => {
	return currentStep === GameSymbol.X ? GameSymbol.O : GameSymbol.X;
};
