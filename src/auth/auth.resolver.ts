import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponseEntity } from "./entity/login-response.entity";
import { UserLoginInput } from "./dto/user-login.input";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponseEntity)
  login(@Args("userLoginInput") userLoginInput: UserLoginInput) {
    return this.authService.login(userLoginInput);
  }
}
