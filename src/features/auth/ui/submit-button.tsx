import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";

interface SubmitButtonProps {
	children: ReactNode;
}

export function SubmitButton({ children }: SubmitButtonProps) {
	return (
		<Button type="submit" className="w-full">
			{children}{" "}
		</Button>
	);
}
