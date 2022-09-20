import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly phone: string;
  @Field(() => String)
  readonly password: string;
}