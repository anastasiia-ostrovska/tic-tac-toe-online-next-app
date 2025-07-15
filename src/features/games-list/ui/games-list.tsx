import { getGamesIdle } from "@/entities/game/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const GamesList = async () => {
	const idleGames = await getGamesIdle();

	return (
		<div className="grid grid-cols-2 gap-4">
			{idleGames.map((game) => {
				return (
					<Card key={game.id}>
						<CardHeader>
							<CardTitle>Game with: {game.creator.login}</CardTitle>
						</CardHeader>
						<CardContent>Rating: {game.creator.rating}</CardContent>
					</Card>
				);
			})}
		</div>
	);
};
