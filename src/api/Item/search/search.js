import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		search: async (_, args) =>
			prisma.items({
				where: {
					AND: [
						{
							itemname_contains: args.term
						}
					]
				}
			})
	}
};
