import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import path from 'path';
import dotenv from 'dotenv';
import { prisma } from '../generated/prisma-client';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
	try {
		const user = await prisma.user({ id: payload.id });
		if (user !== null) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (err) {
		return done(err, false);
	}
};

export const authenticateJwt = (req, res, next) =>
	passport.authenticate('jwt', { sessions: false }, (err, user) => {
		if (user) {
			req.user = user;
		}
		next();
	})(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
