import { ILogs } from '@/core/interfaces/logs.interface';
import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogRepository } from '../logger.repository';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly logsRepository: LogRepository,
    ) {

    }
    use(req: Request, res: Response, next: NextFunction) {
        const { method, url, body } = req;
        const { statusMessage, statusCode } = res;
        const log: ILogs = {
            description: `Incoming Request: ${method} ${url} - Body: ${JSON.stringify(body)}`,
            method,
            url,
            requestBody: body,
            responseStatus: statusCode,
            responseBody: statusMessage,
            duration: 0,
        }

        this.logsRepository.create(log)
            .catch(err => {
                Logger.error(`Failed to save log: ${err.message}`);
            });

        next();
    }
}
