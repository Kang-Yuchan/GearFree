import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
	Mutation: {
		editItem: async (_, args, req) => {
			isAuthenticated(req);
			const { id, itemname, price, kind, action } = args;
			const { user } = req;
			const item = await prisma.$exists.item({ id, user: { id: user.id } });
			if (item) {
				if (action === EDIT) {
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
				} else if (action === DELETE) {
					return prisma.deleteItem({ id });
				}
			} else {
				throw Error("You can't do that");
			}
		}
	}
};
