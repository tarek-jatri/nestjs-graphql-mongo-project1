import { Field, InputType } from "@nestjs/graphql";
import { IsEmpty, MinLength, ValidateIf } from "class-validator";

@InputType()
export class CreateUserInput {

  @IsEmpty()
  @MinLength(4)
  @Field()
  name: string;


  @ValidateIf(object => /^(?:\+88)?01[3-9]\d{8}$/.test(object.phone.toString()))
  @Field()
    // @ValidIf((object, value) => {
    //   console.log("valid if value -> ", value);
    //   return /^(?:\+88)?01[3-9]\d{8}$/.test(value.toString());
    // })
  phone: string;
  
  @IsEmpty()
  @MinLength(6)
  @Field()
  password: string;
}
