import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserLoginInput } from "./dto/user-login.input";
import { User } from "../user/user.schema";
import { LoginResponseEntity } from "./entity/login-response.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getOneUser({ username });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLoginInput: UserLoginInput): Promise<LoginResponseEntity> {
    const { username } = userLoginInput;
    const user = await this.userService.getOneUser({ username });
    const { password, ...result } = user;
    return {
      access_token: "jwt",
      user
    };
  }
}
