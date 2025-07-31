"use client";

import { FormEvent } from "react";
import { success } from "@/shared/lib/either";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFormFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormBottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";

export function SignInForm() {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Handle login logic here
		console.log("Login form submitted");
	};

	return (
		<AuthFormLayout
			title="Sign in"
			description="Welcome back! Sign in to your account to continue"
			fields={<AuthFormFields />}
			actions={<SubmitButton>Sign in</SubmitButton>}
			link={
				<AuthFormBottomLink
					text="Don't have an account? "
					linkTitle="Sign up"
					url="/sign-up"
				/>
			}
			error={<ErrorMessage error={success(null)} />}
			onSubmit={handleSubmit}
		/>
	);
}
