import { getGamesIdle } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateGameButton } from "./create-game-button";

export const GamesList = async () => {
	const idleGames = await getGamesIdle();

	return (
		<Layout actions={<CreateGameButton />}>
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
