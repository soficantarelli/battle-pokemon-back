import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, path: url, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('close', () => {
            const responseTime = Date.now() - response.locals.initTime;
            const { statusCode } = response;
            const contentLength = response.get('content-length');

            this.logger.log(
                `${new Date().toISOString()} ${method} ${originalUrl} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip}`
            );
        });

        next();
    }
}