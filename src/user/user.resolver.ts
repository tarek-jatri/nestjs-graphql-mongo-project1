import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UserType } from "./entities/user.type";
import { UpdateUserInput } from "./dto/update-user.input";
import { DeleteUserInput } from "./dto/delete-user.input";

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
  createUser(@Args("input") createInput: CreateUserInput) {
    return this.userService.createUser(createInput);
  }

  @Mutation(() => UserType)
  updateUser(@Args("input") updateInput: UpdateUserInput) {
    const user = this.userService.updateUser(updateInput);
    return user;
  }

  @Mutation(() => UserType)
  deleteUser(@Args("input") deleteInput: DeleteUserInput) {
    const user = this.userService.deleteUser(deleteInput);
    return user;
  }
}
