import express, { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import { loginValidate } from '../validate/login.validate';
import memberModel from '../models/member.model';
import { hashPassword } from '../utils/passwordHelper';

export const authRouter = express.Router();

authRouter.get('/login', AuthController.loginPage);
authRouter.post('/login', validate(loginValidate), AuthController.loginHandler);
// authRouter.get('/register', async (req, res, next) => {
//   memberModel.create({memberName: 'tom', password: await hashPassword('123456'), name: 'tommy'})
//   res.send('ok')
// })
