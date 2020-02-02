import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';
import { USER_FRAGMENT } from '../../../fragments';

export default {
	Query: {
		seeMe: async (_, __, req) => {
			isAuthenticated(req);
			const { user } = req;
			const userProfile = await prisma.user({ id: user.id });
			const items = await prisma.user({ id: user.id }).items();
			return {
				user: userProfile,
				items
			};
		}
	}
};
