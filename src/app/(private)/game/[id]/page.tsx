import { Game } from "@/features/game/server";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	return (
		<main className="flex flex-col grow pt-24 w-full max-w-lg mx-auto">
			<Game gameId={id} />
		</main>
	);
}
