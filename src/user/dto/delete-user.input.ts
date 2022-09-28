import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @IsNotEmpty()
  @Field()
  _id: string;
}
