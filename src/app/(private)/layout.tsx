import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";
import { sessionService } from "@/entities/user/server";

export default async function PrivateLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { session } = await sessionService.verifySession();

	return (
		<div>
			<header className="flex flex-row justify-between items-center gap-4 px-10 py-4 border-b border-b-primary/50">
				<h1 className="text-xl font-bold">Tik Tac Toe Online</h1>
				<form
					action={async () => {
						"use server";
						await sessionService.deleteSession();
					}}
				>
					<div className="flex flex-row items-center gap-4">
						<p>{session.login}</p>
						<Button variant="outline">Sign out</Button>
					</div>
				</form>
			</header>
			{children}
		</div>
	);
}
