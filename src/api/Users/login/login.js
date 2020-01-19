import { prisma } from '../../../../generated/prisma-client';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../util';

export default {
	Mutation: {
		login: async (_, args) => {
			const { email, password } = args;
			const user = await prisma.user({ email });
			const isMatch = bcrypt.compareSync(password, user.password);
			if (isMatch) {
				return generateToken(user.id);
			} else if (!isMatch) {
				throw new Error('パスワードが間違っています。');
			} else if (!user) {
				throw new Error('存在しないユーザーです。');
			}
			return;
		}
	}
};
