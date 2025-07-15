import { GamesList } from "@/features/games-list/server";

export default async function Home() {
	return (
		<div className="flex flex-col gap-6 container mx-auto pt-10">
			<h1 className="text-3xl font-bold">Games</h1>
			<GamesList />
		</div>
	);
}
