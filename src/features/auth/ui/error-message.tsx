import { Either, matchEither } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";

interface ErrorMessageProps {
	error: Either<string, unknown>;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
	return matchEither(error, {
		error: (error) => (
			<Alert>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		),
		success: () => null,
	});
}
