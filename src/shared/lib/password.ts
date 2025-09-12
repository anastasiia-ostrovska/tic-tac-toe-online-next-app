export const removePassword = <T extends { passwordHash?: string }>(
	data: T
): Omit<T, "passwordHash"> => {
	const { passwordHash, ...rest } = data;
	return rest;
};
