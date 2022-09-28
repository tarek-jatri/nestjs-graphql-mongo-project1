import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  readonly name: string;
  @Field(() => String, { nullable: true })
  readonly phone: string;
  @Field(() => String)
  readonly password: string;
}
