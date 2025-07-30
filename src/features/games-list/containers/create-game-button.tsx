"use client";

import { startTransition } from "react";
import { useActionState } from "@/shared/lib/react";
import { mapError, success } from "@/shared/lib/either";
import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";

export const CreateGameButton = () => {
	const [data, dispatch, isPending] = useActionState(
		createGameAction,
		success(undefined)
	);

	return (
		<div className="flex flex-col gap-1">
			<Button
				className="cursor-pointer"
				disabled={isPending}
				onClick={() => startTransition(dispatch)}
				error={mapError(data, (error) => {
					const errorMessages = {
						["USER_NOT_FOUND"]: "Can't find user",
						["PLAYER_HAS_IDLE_GAME"]: "You can create only one game",
					};

					return errorMessages[error];
				})}
			>
				New Game
			</Button>
		</div>
	);
};
