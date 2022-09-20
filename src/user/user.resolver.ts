import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UserType } from "./entities/user.type";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @Query(() => String)
  async hello() {
    return "Hello, world!";
  }

  @Query(() => [UserType])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => UserType)
  async createUser(@Args("input") createInput: CreateUserInput) {
    return this.userService.createUser(createInput);
  }

  @Mutation(() => UserType)
  async updateUser(@Args("input") updateInput: UpdateUserInput) {
    const user = await this.userService.updateUser(updateInput);
    return user;
  }
}
