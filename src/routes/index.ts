import authenticationRoutes from './authentication.routes';
import express from 'express';
import usersRoutes from './users.routes';

class RouteRegistrar {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  registerRoutes(): void {
    authenticationRoutes(this.app);
    usersRoutes(this.app);
  }
}

export default RouteRegistrar;
