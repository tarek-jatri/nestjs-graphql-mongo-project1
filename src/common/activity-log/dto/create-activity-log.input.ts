import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLogInput {
  @IsNotEmpty()
  @Field()
  previous: object;

  @IsNotEmpty()
  @Field()
  current: object;
}
