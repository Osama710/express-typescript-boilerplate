import { Response } from 'express';
import HelperFunctions from '../helper';

class BaseController {
  // Define common methods or functionality shared across controllers
  response(
    res: Response,
    status: number,
    message: string,
    data: any = {},
    linenumber: Error | null = null,
    explict_count: number | null = null
  ): void {
    HelperFunctions.responseWrapper(res, status, message, data, linenumber, explict_count);
  }
}

export default BaseController;
