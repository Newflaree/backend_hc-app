// ExpressJS
import express from 'express';
// Cors
import cors from 'cors';
// Routes
import { authRoutes } from '../entities/routes';
// Utils
import { logger } from '../utils';


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3002';
    this.apiPaths = {
      auth: '/api/auth',
      narrators: '/api/narrators',
      seed: '/api/seed'
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
    this.app.use( this.apiPaths.auth, authRoutes  );
  }

  listen() {
    this.app.listen( this.port, () => {
      logger.listenServerLogger( this.port );
    });
  }
}

export default Server;
