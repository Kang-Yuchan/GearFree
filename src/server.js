import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import path from 'path';
import passport from 'passport';
import './passport';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.ENV_PORT;

const server = new GraphQLServer({ schema });

server.express.use(logger('dev'));
server.express.use(passport.authenticate('jwt'));

server.start({ port: PORT }, () => console.log(`Server running on: http://localhost:${PORT}`));
