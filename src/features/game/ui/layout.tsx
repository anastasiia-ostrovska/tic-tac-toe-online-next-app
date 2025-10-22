import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface LayoutProps {
	status: ReactNode;
	players: ReactNode;
	field: ReactNode;
}

export function GameLayout({ status, players, field }: LayoutProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Tic Tac Toe 3x3</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{players}
				{status}
				<div className="flex items-center justify-center py-4">{field}</div>
			</CardContent>
		</Card>
	);
}
