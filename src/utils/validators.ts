export const required = (value: any) => value ? undefined : 'Required';

export const maxLength = (maxLength: number) => (value: any) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}

export const composeValidators = (...validators: any) => (value: any) =>
    validators.reduce((error: any, validator: any) => error || validator(value), undefined);