import { Button } from "@/shared/ui/button";
import { prisma } from "@/shared/lib/db";

export default async function Home() {
	const games = await prisma.game.findMany();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Button size="lg">{games[0].name}</Button>
			<Button size="lg">{games[1].name}</Button>
		</div>
	);
}
