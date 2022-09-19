import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

export function ValidIf(callback: (object, value) => {}, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [callback],
      validator: ValidIfConstraint
    });
  };
}

@ValidatorConstraint({ name: "ValidIf" })
export class ValidIfConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [callback] = args.constraints;
    return callback(args.object, value);
  }

}