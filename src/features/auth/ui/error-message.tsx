import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/ui/alert";

export function ErrorMessage({ error = "" }: { error?: string }) {
	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircleIcon />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	return null;
}
