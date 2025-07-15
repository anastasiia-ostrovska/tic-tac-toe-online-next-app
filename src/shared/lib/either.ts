export type Error<E> = {
	type: "error";
	error: E;
};

export type Success<V> = {
	type: "success";
	value: V;
};

export type Either<V, E> = Error<E> | Success<V>;

export const error = <E>(error: E): Error<E> => ({
	type: "error",
	error,
});

export const success = <V>(value: V): Success<V> => ({
	type: "success",
	value: value,
});

export const mapEither = <V, W, E = unknown>(
	either: Either<V, E>,
	fn: (value: V) => W
): Either<W, E> => {
	if (either.type === "success") {
		return { type: "success", value: fn(either.value) };
	}

	return either;
};
