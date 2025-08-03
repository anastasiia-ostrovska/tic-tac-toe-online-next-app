"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { error, mapError } from "@/shared/lib/either";
import { createUser, sessionService } from "@/entities/user/server";

const formDataShema = z.object({
	login: z.string().min(1, { message: "Login is required" }),
	password: z
		.string()
		.min(1, { message: "Password is required" })
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUpAction = async (state: unknown, formData: FormData) => {
	const data = Object.fromEntries(formData.entries());
	const result = formDataShema.safeParse(data);

	if (!result.success) {
		const treeifiedErrors = z.treeifyError(result.error);

		return error(`Validation error: ${treeifiedErrors.properties}`);
	}

	const createdUser = await createUser(result.data);

	if (createdUser.type === "success") {
		await sessionService.createSession(createdUser.value);
		redirect("/");
	}

	return mapError(createdUser, (error) => {
		return {
			["LOGIN_ALREADY_TAKEN"]: "User with this login already exists",
		}[error];
	});
};
