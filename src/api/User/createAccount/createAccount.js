import { prisma } from '../../../../generated/prisma-client';
import bcrypt from 'bcrypt';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const { username, email, password } = args;
			const user = await prisma.createUser({ username, email, password: await bcrypt.hash(password, 10) });
			return user;
		}
	}
};
