import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginResponseEntity } from './entity/login-response.entity';
import { UserType } from '../user/entities/user.type';
import { JwtService } from '@nestjs/jwt';
import { UserSignupInput } from './dto/user-signup.input';
import { SignupResponseEntity } from './entity/signup-response.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getOneUser({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserType): Promise<LoginResponseEntity> {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        phone: user.phone,
        sub: user._id,
      }),
      user,
    };
  }

  async signup(
    userSignupInput: UserSignupInput,
  ): Promise<SignupResponseEntity> {
    const oldUser = await this.userService.getOneUser({
      username: userSignupInput.phone,
    });
    if (oldUser) throw new Error('User Already Exits');
    userSignupInput.password = await bcrypt.hash(userSignupInput.password, 10);
    const user = await this.userService.createUser(userSignupInput);
    const { _id, name, phone } = user;
    return {
      _id,
      name,
      phone,
      message: 'User signed up',
    };
  }
}
