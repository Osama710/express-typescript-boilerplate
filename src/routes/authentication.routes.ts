import { Application } from 'express';
import AuthenticationController from '../controllers/authentication.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import ValidationMiddleware from '../middlewares/validation.middleware';
import { loginSchema } from '../schemas/authentication.schema';

class AuthenticationRoutes {
  register(app: Application): void {
    const controller = new AuthenticationController();
    app.post("/login", ValidationMiddleware.createHandler(loginSchema), controller.login);
    app.get("/protected", authenticationMiddleware, controller.protectedFunction);
    app.post("/migrate", controller.migrate);
  }
}

export default new AuthenticationRoutes().register;
