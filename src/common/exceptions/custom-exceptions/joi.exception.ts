import * as Joi from 'joi';

export class JoiValidationError extends Joi.ValidationError {
    code: string;
    message: string;

    constructor (message, code, error) {
        super(message, error.details, error._original);
        this.code = code;
        this.message = message;
    }
}