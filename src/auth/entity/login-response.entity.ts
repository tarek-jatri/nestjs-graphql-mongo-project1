import { ObjectType, Field } from '@nestjs/graphql';
import { ReturnUserType } from '../../user/entities/return-user.type';

@ObjectType()
export class LoginResponseEntity {
  @Field(() => ReturnUserType)
  user: ReturnUserType;

  @Field(() => String)
  access_token: string;
}
