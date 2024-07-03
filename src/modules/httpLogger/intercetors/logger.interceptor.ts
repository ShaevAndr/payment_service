import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LogRepository } from '../logger.repository';
import { ILogs } from '@/core/interfaces/logs.interface';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    constructor(private readonly logsRepository: LogRepository) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const { method, url, body } = request;
        const now = Date.now();

        return next.handle().pipe(
            tap((data) => {
                const log: ILogs = {
                    method,
                    url,
                    requestBody: body,
                    responseStatus: response.statusCode,
                    responseBody: data,
                    duration: Date.now() - now,
                    description: `Outgoing Request: ${method} ${url} - ${context.getClass().name}`,
                };

                console.log(log);

                this.logsRepository.create(log).catch((err) => {
                    Logger.error(`Failed to save log: ${err.message}`);
                });
            }),
        );
    }
}