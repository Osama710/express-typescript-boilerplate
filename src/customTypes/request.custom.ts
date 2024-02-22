import { Request } from 'express';

interface AuthRequest extends Request {
  user?: any; // Define the type of the user property as any or the actual type of user data
}

export { AuthRequest };
