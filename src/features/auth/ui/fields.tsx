import { useId } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function AuthFormFields() {
	const loginId = useId();
	const passwordId = useId();

	return (
		<>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id={loginId}
					type="email"
					name="login"
					placeholder="Enter your email"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id={passwordId}
					type="password"
					name="password"
					placeholder="Enter your password"
					required
				/>
			</div>
		</>
	);
}
