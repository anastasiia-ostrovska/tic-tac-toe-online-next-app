import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Either, matchEither } from "@/shared/lib/either";

interface ErrorMessageProps {
	error: Either<string, unknown>;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
	return matchEither(error, {
		error: (error) => (
			<Alert variant="destructive">
				<AlertCircleIcon />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		),
		success: () => null,
	});
}
