import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserInput } from "./inputs/user.input";
import { UserType } from "./dto/user.type";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @Query(() => String)
  async hello() {
    return "Hello, world!";
  }

  @Query(() => [UserType])
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => UserType)
  async createUser(@Args("input") input: UserInput) {
    return this.userService.createUser(input);
  }
}
