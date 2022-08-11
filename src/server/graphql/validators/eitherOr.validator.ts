import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class EitherOrConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, { constraints, ...args }: ValidationArguments): boolean {
    const object = args.object as any;
    const [relatedPropertyName] = constraints;
    const relatedPropertyValue = object[relatedPropertyName];
    return (!!value && !relatedPropertyValue) || (!value && !!relatedPropertyValue);
  }

  defaultMessage({ property, constraints }: ValidationArguments): string {
    const [relatedPropertyName] = constraints;
    return `You must either input ${property} or ${relatedPropertyName}`;
  }
}

export function EitherOr(target: string, options?: ValidationOptions) {
  return function (
    { constructor: target }: Object,
    propertyName: string,
  ): void {
    registerDecorator({
      name: 'eitherOr',
      target,
      propertyName,
      options,
      constraints: [target],
      validator: EitherOrConstraint,
    });
  };
}
