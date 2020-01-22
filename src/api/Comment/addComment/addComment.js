import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		addComment: async (_, args, req) => {
			isAuthenticated(req);
			const { text, itemId } = args;
			const { user } = req;
			const comment = await prisma.createComment({
				user: {
					connect: {
						id: user.id
					}
				},
				item: {
					connect: {
						id: itemId
					}
				},
				text
			});
			return comment;
		}
	}
};
