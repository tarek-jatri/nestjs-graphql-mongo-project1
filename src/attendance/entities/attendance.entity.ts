import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Attendance {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
