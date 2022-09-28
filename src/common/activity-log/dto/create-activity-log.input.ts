import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLogInput {
  @IsNotEmpty()
  @Field()
  model: string;

  @IsNotEmpty()
  @Field()
  action: string;

  @IsNotEmpty()
  @Field()
  operationName: string;

  @IsNotEmpty()
  @Field()
  query: string;

  @IsNotEmpty()
  @Field()
  documentId: string;

  @IsNotEmpty()
  @Field()
  requestedBy: string;

  @IsNotEmpty()
  @Field()
  previous: object;

  @IsNotEmpty()
  @Field()
  current: object;
}
