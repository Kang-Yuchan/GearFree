import passport from 'passport';
import JwtStrategy from 'passport-jwt';
import path from 'path';
import dotenv from 'dotenv';
import { userInfo } from 'os';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const jwtOptions = {
	jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secret: process.env.JWT_SECRET
};

const verifyUser = (payload, done) => {
    try {

    } catch {
        
    }
}

passport.use(new JwtStrategy(jwtOptions, verifyUser));
