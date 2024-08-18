import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import axios from 'axios';
import * as _ from 'lodash';
import { GlobalHttpException } from './custom-exceptions/global.exception';
import { JoiValidationError } from './custom-exceptions/joi.exception';

interface ErrorResponse {
    statusCode: number,
    message: string,
    path: string,
    code?: string,
    errors?: string[];
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const error: ErrorResponse = { statusCode: 0, message: '', path: '' };

        console.log(exception);

        if (exception instanceof HttpException) {
            const messages = exception.getResponse()['message'];
            const statusCode = exception.getStatus();
            error.statusCode = statusCode;
            error.message = exception.message && statusCode !== 500 ? exception.message : HttpStatus[statusCode];
            if (exception instanceof GlobalHttpException) error.code = exception.getCode();
            if (Array.isArray(messages)) error.errors = messages;
        } else if (axios.isAxiosError(exception) && exception.response) {
            const statusCode = exception.response.status;
            error.statusCode = statusCode;
            error.message = exception.response.data['error']?.message ?? HttpStatus[statusCode];
            error.code = exception.response.data['error']?.code;
        } else if (exception instanceof JoiValidationError) {
            error.statusCode = 400;
            error.message = exception.message;
            error.code = exception.code ?? HttpStatus[400];
        } else {
            error.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            error.message = 'INTERNAL_SERVER_ERROR';
            error.code = 'INTERNAL_SERVER_ERROR';
        }

        error.path = httpAdapter.getRequestUrl(ctx.getRequest());

        const request = _.pick(ctx.getRequest(), ['params', 'query', 'body', 'file']);
        console.log(request);

        const responseBody = {
            success: false,
            error
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, error.statusCode);
    }
}
