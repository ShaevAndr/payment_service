import { Module } from '@nestjs/common';
import { MongoModule } from '@/modules/mongo/mongo.module';
import { LogRepository } from './logger.repository';
import { LogsProviders } from './logger.providers';
import { HttpLoggerMiddleware } from './midlleware/logger.midlleware';
import { HttpLoggingInterceptor } from './intercetors/logger.interceptor';

@Module({
    imports: [MongoModule],
    providers: [
        HttpLoggingInterceptor,
        HttpLoggerMiddleware,
        LogRepository,
        ...LogsProviders
    ],
    exports: [LogRepository, ...LogsProviders, HttpLoggingInterceptor, HttpLoggerMiddleware],
})
export class HttpLogsModule { }
