import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
