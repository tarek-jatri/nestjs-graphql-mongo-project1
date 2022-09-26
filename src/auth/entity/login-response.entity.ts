import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../../user/user.schema";
import { UserType } from "../../user/entities/user.type";

@ObjectType()
export class LoginResponseEntity {
  @Field(() => UserType)
  user: User;

  @Field(() => String)
  access_token: string;
}
