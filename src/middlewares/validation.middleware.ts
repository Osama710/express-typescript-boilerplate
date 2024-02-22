import { Request, Response, NextFunction } from "express";
import HelperFunctions from "../helper";

class ValidationMiddleware {
  private resourceSchema: any;

  constructor(resourceSchema: any) {
    this.resourceSchema = resourceSchema;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.resourceSchema.validate(req.body, { abortEarly: false });
      next(); // Call next middleware if validation succeeds
    } catch (error: any) {
      console.log(error);
      // Send response if validation fails
      return HelperFunctions.responseWrapper(res, 400, error.errors);
    }
  }

  static createHandler(
    schema: any
  ): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    const instance = new ValidationMiddleware(schema);
    return instance.handle.bind(instance);
  }
}

export default ValidationMiddleware;
