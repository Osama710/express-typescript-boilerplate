import { Application } from 'express';
import AuthenticationController from '../controllers/authentication.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import ValidationMiddleware from '../middlewares/validation.middleware';
import { loginSchema } from '../schemas/authentication.schema';

class AuthenticationRoutes {
  register(app: Application): void {
    const controller = new AuthenticationController();
    app.post("/login", ValidationMiddleware.createHandler(loginSchema), (req, res) => controller.login(req, res));
    app.get("/protected", authenticationMiddleware, (req, res) => controller.protectedFunction(req, res));
    app.post("/migrate", (req, res) => controller.migrate(req, res));
  }
}

export default new AuthenticationRoutes().register;
