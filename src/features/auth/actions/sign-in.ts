"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { error, mapError } from "@/shared/lib/either";
import { sessionService, verifyUser } from "@/entities/user/server";

const formDataShema = z.object({
	login: z.string().min(1, { message: "Login is required" }),
	password: z
		.string()
		.min(1, { message: "Password is required" })
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const signInAction = async (state: unknown, formData: FormData) => {
	const data = Object.fromEntries(formData.entries());
	const result = formDataShema.safeParse(data);

	if (!result.success) {
		const treeifiedErrors = z.treeifyError(result.error);

		return error(`Validation error: ${treeifiedErrors.properties}`);
	}

	const verifiedUser = await verifyUser(result.data);

	if (verifiedUser.type === "success") {
		await sessionService.createSession(verifiedUser.value);
		redirect("/");
	}

	return mapError(verifiedUser, (error) => {
		return {
			["INCORRECT_LOGIN_OR_PASSWORD"]:
				"Incorrect login or password. Please try again.",
		}[error];
	});
};
