import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		editUser: (_, args, req) => {
			isAuthenticated(req);
			const { username, email, password } = args;
			const { user } = req;
			return prisma.updateUser({
				where: { id: user.id },
				data: { username, email, password }
			});
		}
	}
};
