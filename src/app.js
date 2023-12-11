export * from 'colors';
import dotenv from 'dotenv';
dotenv.config();
// Models
import { Server } from './models';

const server = new Server();
server.listen();
