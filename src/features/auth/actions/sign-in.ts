"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { sessionService, verifyUser } from "@/entities/user/server";

export type SignInFormState = {
	formData?: FormData;
	errors?: {
		login?: string;
		password?: string;
		_errors?: string;
	};
};

const formDataShema = z.object({
	login: z.string().min(3),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const signInAction = async (
	state: SignInFormState,
	formData: FormData
): Promise<SignInFormState> => {
	const data = Object.fromEntries(formData.entries());
	const result = formDataShema.safeParse(data);

	if (!result.success) {
		const formattedErrors = result.error.format();

		return {
			formData,
			errors: {
				login: formattedErrors.login?._errors?.join(", "),
				password: formattedErrors.password?._errors?.join(", "),
				_errors: formattedErrors._errors?.join(", "),
			},
		};
	}

	const verifiedUser = await verifyUser(result.data);

	if (verifiedUser.type === "success") {
		await sessionService.createSession(verifiedUser.value);
		redirect("/");
	}

	const errorMessage = {
		["INCORRECT_LOGIN_OR_PASSWORD"]:
			"Incorrect login or password. Please try again.",
	}[verifiedUser.error];

	return {
		formData,
		errors: {
			_errors: errorMessage,
		},
	};
};
