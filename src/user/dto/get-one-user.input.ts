import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class GetOneUserInput {
  @IsNotEmpty()
  @MinLength(4)
  @Field()
  username: string;
}
