import { BadRequestError } from '../errors/BadRequestError';
import { loginDTO } from '../interfaces/login.interface';
import memberModel from '../models/member.model';
import { signToken } from '../utils/jwt';
import { isPasswordMatch } from '../utils/passwordHelper';

export default class AuthService {
  static async loginHandler(loginDTO: loginDTO) {
    const member = await memberModel.findOne({ memberName: loginDTO.username });
    if (!member)
      throw new BadRequestError(
        'Username does not exist or password is incorrect',
        loginDTO
      );
      
    const isMatch = await isPasswordMatch(loginDTO.password, member.password);
    
    if (!isMatch) {
      throw new BadRequestError(
        'Username does not exist or password is incorrect',
        loginDTO
      );
    }

    const token = signToken({ userId: member._id });
    return token;
  }
}
