import { getGamesIdle } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import { GameCard } from "@/features/games-list/ui/game-card";

export const GamesList = async () => {
	const idleGames = await getGamesIdle();

	return (
		<Layout>
			{idleGames.map((game) => (
				<GameCard
					key={game.id}
					login={game.creator.login}
					rating={game.creator.rating}
				/>
			))}
		</Layout>
	);
};
