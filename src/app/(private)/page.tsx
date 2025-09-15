import { GamesList } from "@/features/games-list/server";

export default async function Home() {
	return (
		<div className="flex flex-col gap-6 container mx-auto px-10 py-10 max-w-screen-md">
			<h1 className="text-3xl font-bold">Games</h1>
			<GamesList />
		</div>
	);
}
