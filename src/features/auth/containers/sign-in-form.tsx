"use client";

import { useActionState } from "@/shared/lib/react";
import { signInAction, SignInFormState } from "../actions/sign-in";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFormFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormBottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";

export function SignInForm() {
	const [formState, action, isPending] = useActionState(
		signInAction,
		{} as SignInFormState
	);

	return (
		<AuthFormLayout
			title="Sign in"
			description="Welcome back! Sign in to your account to continue"
			fields={<AuthFormFields {...formState} />}
			actions={<SubmitButton isDisabled={isPending}>Sign in</SubmitButton>}
			link={
				<AuthFormBottomLink
					text="Don't have an account? "
					linkTitle="Sign up"
					url="/sign-up"
				/>
			}
			error={<ErrorMessage error={formState.errors?._errors} />}
			action={action}
		/>
	);
}
