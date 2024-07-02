import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogRepository } from '../logger.repository';
import { ILogs } from '@/core/interfaces/logs.interface';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    constructor(private readonly logsRepository: LogRepository) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body } = request;
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap((data) => {
                    Logger.log(`Outgoing Request: ${method} ${url} - Body: ${JSON.stringify(body)} - Response: ${JSON.stringify(data)} - ${Date.now() - now}ms`, context.getClass().name);
                    const log: ILogs = {
                        method,
                        url,
                        requestBody: body,
                        responseStatus: data.status,
                        responseBody: data.data,
                        duration: Date.now() - now,
                        description: `Outgoing Request: ${method} ${url} - Body: ${JSON.stringify(body)} - Response: ${JSON.stringify(data)} - ${Date.now() - now}ms ${context.getClass().name}`,
                    };

                    this.logsRepository.create(log)
                        .catch(err => {
                            Logger.error(`Failed to save log: ${err.message}`);
                        });
                }),
            );
    }
}
