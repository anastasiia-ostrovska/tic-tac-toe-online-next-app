"use client";

import { useActionState } from "@/shared/lib/react";
import { signUpAction, type SignUpFormState } from "../actions/sign-up";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFormFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormBottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";

export function SignUpForm() {
	const [formState, action, isPending] = useActionState(
		signUpAction,
		{} as SignUpFormState
	);

	return (
		<AuthFormLayout
			title="Sign up"
			description="Create an account to play with your friends and have fun!"
			fields={<AuthFormFields {...formState} />}
			actions={<SubmitButton isDisabled={isPending}>Sign up</SubmitButton>}
			link={
				<AuthFormBottomLink
					text="Already have an account? "
					linkTitle="Sign in"
					url="/sign-in"
				/>
			}
			error={<ErrorMessage error={formState?.errors?._errors} />}
			action={action}
		/>
	);
}
