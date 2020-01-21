export const isAuthenticated = (req) => {
	if (!req.user) {
		throw Error('ログインをしてください。');
	}
	return;
};
