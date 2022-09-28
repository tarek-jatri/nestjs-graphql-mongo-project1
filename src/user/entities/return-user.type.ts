import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReturnUserType {
  @Field(() => ID)
  _id: string;
  @Field(() => String)
  readonly name: string;
  @Field(() => String, { nullable: true })
  readonly phone: string;
}
