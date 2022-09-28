import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from '../../user/dto/create-user.input';

@InputType()
export class UserSignupInput extends CreateUserInput {}
