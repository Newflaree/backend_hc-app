// ExpressJS
import express from 'express';
// Cors
import cors from 'cors';
// Routes
import {
  adminRoutes,
  authRoutes,
  seedRoutes,
  uploadsRoutes,
  usersRoutes
} from '../entities/routes';
// Utils
import { logger } from '../utils';


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3002';
    this.apiPaths = {
      admin: '/api/admin',
      auth: '/api/auth',
      narrators: '/api/narrators',
      seed: '/api/seed',
      uploads: '/api/uploads',
      users: '/api/users'
    }

    // Initial methods
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
  }

  routes() {
    this.app.use( this.apiPaths.admin, adminRoutes );
    this.app.use( this.apiPaths.auth, authRoutes );
    this.app.use( this.apiPaths.seed, seedRoutes );
    this.app.use( this.apiPaths.uploads, uploadsRoutes );
    this.app.use( this.apiPaths.users, usersRoutes );
  }

  listen() {
    this.app.listen( this.port, () => {
      logger.listenServerLogger( this.port );
    });
  }
}

export default Server;
