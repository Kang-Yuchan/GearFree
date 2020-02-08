import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		editItem: async (_, args, req) => {
			isAuthenticated(req);
			const { id, itemname, price, kind } = args;
			const { user } = req;
			const item = await prisma.$exists.item({ id, user: { id: user.id } });
			if (item) {
				return prisma.updateItem({
					data: {
						itemname,
						price,
						kind
					},
					where: {
						id
					}
				});
			} else {
				throw Error("You can't do that");
			}
		}
	}
};
