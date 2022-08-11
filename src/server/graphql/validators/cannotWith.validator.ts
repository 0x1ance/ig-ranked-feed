import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class CannotWithConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, { constraints, ...args }: ValidationArguments): boolean {
    const object = args.object as any;

    return constraints.every(constraint => !object[constraint]);
  }

  defaultMessage({ property, constraints }: ValidationArguments): string {
    const join = constraints.join(', ');

    return `${property} cannot be used with ${join}`;
  }
}

export function CannotWith(props: Array<string>, options?: ValidationOptions) {
  return function (
    { constructor: target }: Object,
    propertyName: string,
  ): void {
    registerDecorator({
      target,
      propertyName,
      options,
      constraints: props,
      validator: CannotWithConstraint,
    });
  };
}
