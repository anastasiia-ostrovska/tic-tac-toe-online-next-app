import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const emptyField = Array(9).fill(null);

async function main() {
	const user = await prisma.user.create({
		data: { login: "Ann", passwordHash: "gfg8377fgff", rating: 1000 },
	});
	const user2 = await prisma.user.create({
		data: { login: "John", passwordHash: "suwujl77fgff", rating: 950 },
	});
	await prisma.game.create({
		data: {
			field: emptyField,
			status: "gameIdle",
			players: { connect: { id: user.id } },
		},
	});
	await prisma.game.create({
		data: {
			field: emptyField,
			status: "gameIdle",
			players: { connect: { id: user2.id } },
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
