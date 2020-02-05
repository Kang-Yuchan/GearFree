import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		seeUser: async (_, args) => {
			const { id } = args;
			const user = await prisma.user({ id });
			const items = await prisma.user({ id }).items();
			return {
				user,
				items
			};
		}
	}
};
