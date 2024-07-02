import { Module } from '@nestjs/common';
import { MongoModule } from '@/modules/mongo/mongo.module';
import { LogRepository } from './logger.repository';
import { LogsProviders } from './logger.providers';
import { HttpLoggerMiddleware } from './midlleware/logger.midlleware';

@Module({
    imports: [MongoModule],
    providers: [
        HttpLoggerMiddleware,
        LogRepository,
        ...LogsProviders
    ],
    exports: [LogRepository, ...LogsProviders],
})
export class LogsModule { }
