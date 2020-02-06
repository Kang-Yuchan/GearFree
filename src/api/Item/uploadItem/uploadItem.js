import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		uploadItem: async (_, args, req) => {
			isAuthenticated(req);
			const { user } = req;
			const { itemname, price, kind, files } = args;
			const item = await prisma.createItem({
				itemname,
				price,
				kind,
				user: {
					connect: {
						id: user.id
					}
				}
			});
			files.forEach(
				async (file) =>
					await prisma.createFile({
						url: file,
						item: {
							connect: {
								id: item.id
							}
						}
					})
			);
			return item;
		}
	}
};
