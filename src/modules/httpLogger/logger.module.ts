import { Module } from '@nestjs/common';
import { LogRepository } from './logger.repository';
import { HttpLoggerMiddleware } from './midlleware/logger.midlleware';
import { HttpLoggingInterceptor } from './intercetors/logger.interceptor';
import { DatabaseModule } from '../db/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [
        HttpLoggingInterceptor,
        HttpLoggerMiddleware,
        LogRepository,
    ],
    exports: [LogRepository, HttpLoggingInterceptor, HttpLoggerMiddleware],
})
export class HttpLogsModule { }
