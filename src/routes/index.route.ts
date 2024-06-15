import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/NotFoundError';
import { authRouter } from './auth.route';
import { errorRouter } from './error.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/error', errorRouter)
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

export default router;
