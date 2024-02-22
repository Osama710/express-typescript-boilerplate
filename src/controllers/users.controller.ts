import BaseController from "./base.controller";
import { Request, Response } from "express";
import { models } from "../models/index";
import bcrypt from "bcrypt";
import HelperFunctions from "../helper";

class UsersController extends BaseController {
  usersListing = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await models.Users.findAll({
        attributes: { exclude: ["password"] },
      });
      return this.response(res, 200, "Users fetched successfully", users);
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  };
  userByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await models.Users.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return this.response(res, 404, "User not found", null);
      }
      return this.response(res, 200, "User fetched successfully", user);
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const user = await models.Users.findOne({ where: { email } });
      if (user) {
        return this.response(res, 409, "User already exists", null);
      }
      const password = HelperFunctions.generateRandomPassword(8);
      req.body.password = await bcrypt.hash(password, 10);
      const newUser = await models.Users.create(req.body);
      return this.response(res, 200, "User created successfully", newUser);
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const user = await models.Users.findByPk(id);
      if (!user) {
        return this.response(res, 404, "User not found");
      }
      if (email) {
        const existingUser = await models.Users.findOne({
          where: { email },
        });
        if (existingUser) {
          return this.response(res, 409, "User already exists");
        }
      }
      const updatedUser = await user.update(req.body);
      return this.response(res, 200, "User updated successfully", updatedUser);
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await models.Users.findByPk(id);
      if (!user) {
        return this.response(res, 404, "User not found");
      }
      await user.destroy();
      return this.response(res, 200, "User deleted successfully");
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  };
}

export default UsersController;
