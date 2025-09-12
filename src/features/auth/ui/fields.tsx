import { useId } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function AuthFormFields({
	formData,
	errors,
}: {
	formData?: FormData;
	errors?: { login?: string; password?: string };
}) {
	const loginId = useId();
	const passwordId = useId();

	return (
		<>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					required
					id={loginId}
					type="text"
					name="login"
					placeholder="Enter your email"
					defaultValue={formData?.get("login")?.toString()}
				/>
				{errors?.login && (
					<p className="text-sm text-red-500">{errors.login}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					required
					id={passwordId}
					type="password"
					name="password"
					placeholder="Enter your password"
					defaultValue={formData?.get("password")?.toString()}
				/>
				{errors?.password && (
					<p className="text-sm text-red-500">{errors.password}</p>
				)}
			</div>
		</>
	);
}
