"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createUser, sessionService } from "@/entities/user/server";

export type SignUpFormState = {
	formData?: FormData;
	errors?: {
		login?: string;
		password?: string;
		_errors?: string;
	};
};

const formDataShema = z.object({
	login: z.string().min(1),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUpAction = async (
	state: unknown,
	formData: FormData
): Promise<SignUpFormState> => {
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

	const createdUser = await createUser(result.data);

	if (createdUser.type === "success") {
		await sessionService.createSession(createdUser.value);
		redirect("/");
	}

	const errorMessage = {
		["LOGIN_ALREADY_TAKEN"]: "User with this login already exists",
	}[createdUser.error];

	return {
		formData,
		errors: {
			_errors: errorMessage,
		},
	};
};
