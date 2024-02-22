import BaseController from "./base.controller";
import { Request, Response } from "express";
import { models } from "../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthenticationController extends BaseController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await models.Users.findOne({
        where: { email },
      });
      if (user !== null) {
        if (!user.is_active) {
          return this.response(res, 400, "Please contact your administrator");
        }
        const isPasswordValid = await bcrypt.compare(
          password.toString(),
          user.password.toString()
        );
        const failedLoginAttempts = await models.FailedLoginAttempt.findAll({
          where: { user_id: user.id },
          order: [["created_at", "DESC"]],
        });

        if (failedLoginAttempts && failedLoginAttempts.length >= 3) {
          const latestFailedAttemptTimestamp =
            failedLoginAttempts[0]?.created_at;
          const currentTimestamp = new Date();
          const fiveMinutesAgo = new Date(
            currentTimestamp.getTime() - 5 * 60 * 1000
          );
          if (
            latestFailedAttemptTimestamp &&
            latestFailedAttemptTimestamp > fiveMinutesAgo
          ) {
            return this.response(
              res,
              400,
              "Too many failed login attempts. Please try again later."
            );
          }
        }

        if (isPasswordValid) {
          await models.FailedLoginAttempt.destroy({
            where: { user_id: user.id },
          });
          const token = jwt.sign({ user }, process.env.JWT_SECRET!);
          if (token) {
            user.setDataValue("token", token); // Assuming "token" is a property of the UserAttributes interface
          }
          user.setDataValue("password", ""); // Assuming "password" is a property of the UserAttributes interface and it expects a string

          return this.response(res, 200, "Logged in successfully!", user);
        } else {
          // Get the client's IP address from the request headers
          const clientIp =
            typeof req.headers["x-forwarded-for"] === "string"
              ? req.headers["x-forwarded-for"]
              : typeof req.socket.remoteAddress === "string"
              ? req.socket.remoteAddress
              : "unknown";

          await models.FailedLoginAttempt.create({
            user_id: user.id,
            ip_address: clientIp,
          });
          return this.response(res, 400, "Invalid email or password");
        }
      } else {
        return this.response(res, 400, "Invalid email or password");
      }
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  }

  async protectedFunction(req: Request, res: Response): Promise<void> {
    try {
      return this.response(res, 200, "Hello World!!!!");
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  }

  async migrate(req: Request, res: Response): Promise<void> {
    try {
      await models.Users.sync();
      await models.FailedLoginAttempt.sync();

      const plain_password = "Test@123";
      const saltRounds = 5;

      const hashedPassword = await bcrypt.hash(
        plain_password,
        parseInt(saltRounds.toString())
      );
      const admin = await models.Users.create({
        first_name: "Super",
        last_name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
      });
      return this.response(
        res,
        200,
        `DB created, permissions added successfully.`
      );
    } catch (error: any) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  }
}

export default AuthenticationController;
