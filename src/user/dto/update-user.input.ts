import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @Field()
  _id: string;
}
