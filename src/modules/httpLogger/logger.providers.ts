import { Connection } from 'mongoose';
import { LogsSchema } from './schema/logs.schema';

export const LogsProviders = [
    {
        provide: 'LOG_MODEL',
        useFactory: (connection: Connection) => connection.model('Logs', LogsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];