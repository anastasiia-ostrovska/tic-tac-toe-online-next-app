"use client";

import { FormEvent } from "react";
import { success } from "@/shared/lib/either";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFormFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormBottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";

export function SignUpForm() {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Handle login logic here
		console.log("Login form submitted");
	};

	return (
		<AuthFormLayout
			title="Sign up"
			description="Create an account to play with your friends and have fun!"
			fields={<AuthFormFields />}
			actions={<SubmitButton>Sign up</SubmitButton>}
			link={
				<AuthFormBottomLink
					text="Already have an account? "
					linkTitle="Sign in"
					url="/sign-in"
				/>
			}
			error={<ErrorMessage error={success(null)} />}
			onSubmit={handleSubmit}
		/>
	);
}
