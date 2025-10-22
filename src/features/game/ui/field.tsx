"use client";
import { GameEntity } from "@/entities/game";

interface GameFieldProps {
	game: GameEntity;
	onCellClick?: (index: number) => void;
}

export function GameField({ game, onCellClick }: GameFieldProps) {
	return (
		<div className="grid grid-cols-3">
			{game.field.map((symbol, index) => (
				<button
					key={index}
					onClick={() => onCellClick?.(index)}
					className="flex justify-center items-center w-10 h-10 border border-primary cursor-pointer"
				>
					{symbol ?? ""}
				</button>
			))}
		</div>
	);
}
