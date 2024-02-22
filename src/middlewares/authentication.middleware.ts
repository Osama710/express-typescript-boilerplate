import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HelperFunctions from '../helper';
import Users from '../models/users.model';
import { AuthRequest } from '../customTypes/request.custom';

class AuthenticationMiddleware {
  async handle(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return HelperFunctions.responseWrapper(res, 401, "Missing authorization header.");
    }

    const token = authorization.replace("Bearer ", "");

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const verifyUser = await Users.findByPk(decoded.user.id);
      if (!verifyUser) {
        return HelperFunctions.responseWrapper(res, 401, "Invalid token.");
      }
      req.user = decoded.user;
      next();
    } catch (error) {
      console.log("error-authMiddleware", error);
      return HelperFunctions.responseWrapper(res, 401, "Invalid token.");
    }
  }
}

async function middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  await new AuthenticationMiddleware().handle(req, res, next);
}

export default middleware;
