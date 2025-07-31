import { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";

interface AuthFormLayoutProps {
	title: string;
	description: string;
	fields: ReactNode;
	actions: ReactNode;
	link: ReactNode;
	error: ReactNode;
	action: (formData: FormData) => void;
}

export function AuthFormLayout({
	title,
	description,
	fields,
	actions,
	link,
	error,
	action,
}: AuthFormLayoutProps) {
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">
					{title}
				</CardTitle>
				<CardDescription className="text-center">{description}</CardDescription>
			</CardHeader>
			<form action={action} className="flex flex-col gap-6">
				<CardContent className="space-y-4">
					{fields}
					{error}
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					{actions}
					{link}
				</CardFooter>
			</form>
		</Card>
	);
}
