import "server-only";
import { SignJWT, jwtVerify } from "jose";
import {
	SessionEntity,
	UserEntity,
	userToSession,
} from "@/entities/user/domain";
import { success, error } from "@/shared/lib/either";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const sessionService = { createSession, deleteSession, verifySession };

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionEntity) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return success(payload as SessionEntity);
	} catch (err) {
		return error(err);
	}
}

async function createSession(user: UserEntity) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = userToSession(user, expiresAt.toISOString());
	const sessionEncrypted = await encrypt(session);
	const cookieStore = await cookies();

	cookieStore.set("session", sessionEncrypted, {
		httpOnly: true,
		// secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

async function verifySession() {
	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	if (session.type === "error") {
		redirect("/sign-in");
	}

	return { isAuth: true, session: session.value };
}

async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
