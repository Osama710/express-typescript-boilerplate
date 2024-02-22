import { Application } from 'express';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import pathVariableMiddleware from '../middlewares/pathVariable.middleware';
import UsersController from '../controllers/users.controller';
import ValidationMiddleware from '../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/users.schema';

class UsersRoutes {
  register(app: Application): void {
    const controller = new UsersController();
    app.get("/users", authenticationMiddleware, (req, res) => controller.usersListing(req, res));
    app.get("/user/:id", authenticationMiddleware, pathVariableMiddleware, (req, res) => controller.userByID(req, res));
    app.post("/user", authenticationMiddleware, ValidationMiddleware.createHandler(createUserSchema), (req, res) => controller.createUser(req, res));
    app.put("/user/:id", authenticationMiddleware, pathVariableMiddleware, ValidationMiddleware.createHandler(updateUserSchema), (req, res) => controller.updateUser(req, res));
    app.delete("/user/:id", authenticationMiddleware, pathVariableMiddleware, (req, res) => controller.deleteUser(req, res));
  }
}

export default new UsersRoutes().register;
