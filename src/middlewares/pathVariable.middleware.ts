import { Request, Response, NextFunction } from 'express';
import HelperFunctions from '../helper';

class PathVariableMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, slug, uuid } = req.params;
      // const valid = HelperFunctions.validatePathVariable(id);
      // if (!valid) {
      //   return HelperFunctions.responseWrapper(
      //     res,
      //     400,
      //     "Invalid ID provided."
      //   );
      // }
      const valid = id
        ? HelperFunctions.validatePathVariable("id", id)
        : slug
        ? HelperFunctions.validatePathVariable("slug", slug)
        : uuid
        ? HelperFunctions.validatePathVariable("uuid", uuid)
        : null;
      if (!valid) {
        return HelperFunctions.responseWrapper(
          res,
          400,
          "Invalid parameter provided."
        );
      }
      next();
    } catch (error) {
      console.log("error-PathVariableMiddleware", error);
      return HelperFunctions.responseWrapper(
        res,
        500,
        "Something went wrong"
      );
    }
  }
}

async function middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  await new PathVariableMiddleware().handle(req as Request, res, next);
}

export default middleware;
