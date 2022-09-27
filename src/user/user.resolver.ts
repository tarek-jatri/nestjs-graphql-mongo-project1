import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './entities/user.type';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { GetOneUserInput } from './dto/get-one-user.input';
import { ReturnUserType } from './entities/return-user.type';
import { UseGuards } from '@nestjs/common';
import { JwtAtuhGuard } from '../auth/guards/jwt-atuh.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'Hello, world!';
  }

  @UseGuards(JwtAtuhGuard)
  @Query(() => [ReturnUserType])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => UserType)
  updateUser(@Args('input') updateInput: UpdateUserInput) {
    const user = this.userService.updateUser(updateInput);
    return user;
  }

  @Mutation(() => UserType)
  deleteUser(@Args('input') deleteInput: DeleteUserInput) {
    const user = this.userService.deleteUser(deleteInput);
    return user;
  }
}
