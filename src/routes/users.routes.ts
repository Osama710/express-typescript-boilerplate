import { Application } from 'express';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import pathVariableMiddleware from '../middlewares/pathVariable.middleware';
import UsersController from '../controllers/users.controller';
import ValidationMiddleware from '../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/users.schema';

class UsersRoutes {
  register(app: Application): void {
    const controller = new UsersController();
    app.get("/users", authenticationMiddleware, controller.usersListing);
    app.get("/user/:id", authenticationMiddleware, pathVariableMiddleware, controller.userByID);
    app.post("/user", authenticationMiddleware, ValidationMiddleware.createHandler(createUserSchema), controller.createUser);
    app.put("/user/:id", authenticationMiddleware, pathVariableMiddleware, ValidationMiddleware.createHandler(updateUserSchema), controller.updateUser);
    app.delete("/user/:id", authenticationMiddleware, pathVariableMiddleware, controller.deleteUser);
  }
}

export default new UsersRoutes().register;
