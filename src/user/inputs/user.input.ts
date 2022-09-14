import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput {
  @Field()
  name: string;
  @Field()
  phone: string;
  @Field()
  password: string;
}
