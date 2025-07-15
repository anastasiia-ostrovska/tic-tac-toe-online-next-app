import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface GameCardProps {
	login: string;
	rating: number;
}

export const GameCard = ({ login, rating }: GameCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Game with: {login}</CardTitle>
			</CardHeader>
			<CardContent>Rating: {rating}</CardContent>
		</Card>
	);
};
