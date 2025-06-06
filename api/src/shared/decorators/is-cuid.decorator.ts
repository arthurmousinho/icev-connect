import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

const CUID_REGEX = /^c[^\s-]{24}$/;

export function IsCuid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCuid',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return typeof value === 'string' && CUID_REGEX.test(value);
                },
                defaultMessage(_args: ValidationArguments) {
                    return 'O valor de $property não é um CUID válido';
                },
            },
        });
    };
}