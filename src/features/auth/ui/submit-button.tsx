import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";

interface SubmitButtonProps {
	children: ReactNode;
	isDisabled: boolean;
}

export function SubmitButton({ children, isDisabled }: SubmitButtonProps) {
	return (
		<Button type="submit" disabled={isDisabled} className="w-full">
			{children}
		</Button>
	);
}
