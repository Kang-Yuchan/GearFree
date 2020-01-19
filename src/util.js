import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
