import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../errors/UnauthorizedError';

export const Authorization = (roles: boolean[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
      next(new UnAuthorizedError());
    }
    if (!roles.includes(res.locals.user.isAdmin)) {
      next(new UnAuthorizedError());
    }
    next();
  };
};
