import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseEntity } from './entity/login-response.entity';
import { UserLoginInput } from './dto/user-login.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserType } from '../user/entities/user.type';
import { ReturnUserType } from '../user/entities/return-user.type';
import { UserSignupInput } from './dto/user-signup.input';
import { SignupResponseEntity } from './entity/signup-response.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponseEntity)
  login(
    @Args('userLoginInput') userLoginInput: UserLoginInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => SignupResponseEntity)
  signup(@Args('userLoginInput') userSignupInput: UserSignupInput) {
    return this.authService.signup(userSignupInput);
  }
}
