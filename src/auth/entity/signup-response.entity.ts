import { ObjectType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ReturnUserType } from "../../user/entities/return-user.type";

@ObjectType()
export class SignupResponseEntity extends ReturnUserType {
  @IsOptional()
  @IsNotEmpty()
  @Field(() => String)
  message: string;
}
