export type Error<E> = {
	type: "error";
	error: E;
};

export type Success<V> = {
	type: "success";
	value: V;
};

export type Either<E, V> = Error<E> | Success<V>;

export const error = <E>(error: E): Error<E> => ({
	type: "error",
	error,
});

export const success = <V>(value: V): Success<V> => ({
	type: "success",
	value,
});

export const mapSuccess = <E, V, V2>(
	either: Either<E, V>,
	fn: (value: V) => V2
): Either<E, V2> => {
	if (either.type === "success") {
		return success(fn(either.value));
	}

	return either;
};

export const mapError = <E, V, E2>(
	either: Either<E, V>,
	fn: (error: E) => E2
): Either<E2, V> => {
	if (either.type === "error") {
		return error(fn(either.error));
	}

	return either;
};

export const matchEither = <E, V, W>(
	either: Either<E, V>,
	matchers: {
		error: (error: E) => W;
		success: (value: V) => W;
	}
): W => {
	if (either.type === "error") {
		return matchers.error(either.error);
	}

	return matchers.success(either.value);
};
