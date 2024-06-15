import { NextFunction, Request, Response } from 'express';
import { loginDTO } from '../interfaces/login.interface';
import AuthService from '../services/auth.service';
import AppConfig from '../config/appConfig';

export default class AuthController {
  static async loginHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const loginDTO: loginDTO = { username, password };
      const token = await AuthService.loginHandler(loginDTO);
      res.cookie('accessToken', token, { maxAge: AppConfig.JWT_EXPIRE });
      res.render('./home')
    } catch (err) {
      next(err);
    }
  }
  static async loginPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.render('./auth/login');
    } catch (err) {
      next(err);
    }
  }
}
