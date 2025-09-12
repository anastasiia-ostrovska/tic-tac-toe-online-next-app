"use client";

import { useActionState } from "@/shared/lib/react";
import { success } from "@/shared/lib/either";
import { signUpAction } from "../actions/sign-up";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFormFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormBottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";

export function SignUpForm() {
	const [formState, action, isPending] = useActionState(
		signUpAction,
		success(undefined)
	);

	return (
		<AuthFormLayout
			title="Sign up"
			description="Create an account to play with your friends and have fun!"
			fields={<AuthFormFields />}
			actions={<SubmitButton isDisabled={isPending}>Sign up</SubmitButton>}
			link={
				<AuthFormBottomLink
					text="Already have an account? "
					linkTitle="Sign in"
					url="/sign-in"
				/>
			}
			error={<ErrorMessage error={formState} />}
			action={action}
		/>
	);
}
