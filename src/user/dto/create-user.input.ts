import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength, ValidateIf } from "class-validator";
import { ValidIf } from "../../common/decorator/valid-if.decorator";

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @MinLength(4)
  @Field()
  name: string;

  @ValidIf(object => /^(?:\+88)?01[3-9]\d{8}$/.test(object.phone.toString()), {message: "Please enter a valid phone number"})
  @IsNotEmpty()
  @Field()
  phone: string;
  
  @IsNotEmpty()
  @MinLength(6)
  @Field()
  password: string;
}
