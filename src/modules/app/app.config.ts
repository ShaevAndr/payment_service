import type { ConfigModuleOptions } from '@nestjs/config';
import type { QueueOptions } from 'bullmq';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Params } from 'nestjs-pino';

import { LogLevel, NodeEnv } from '@/core/enums';
import Joi from 'joi';

export class AppConfig {
    public static getBullMQConfig(): QueueOptions {
        return {
            connection: {
                host: process.env.REDIS_HOST,
                password: process.env.REDIS_PASSWORD,
                port: Number(process.env.REDIS_PORT),
            },
            defaultJobOptions: {
                removeOnComplete: 1000,
                removeOnFail: 5000,
            },
        };
    }

    public static getInitConifg(): ConfigModuleOptions {
        const validLogLevelList = Object.keys(LogLevel).map((key) => LogLevel[key]);
        const validNodeEnvList = Object.keys(NodeEnv).map((key) => NodeEnv[key]);

        return {
            isGlobal: true,
            validationSchema: Joi.object(<
                { [P in keyof NodeJS.ProcessEnv]: Joi.SchemaInternals }
                >{
                    BASE_PATH: Joi.string().allow('').optional(),
                    LOG_LEVEL: Joi.string()
                        .allow('')
                        .valid(...validLogLevelList)
                        .optional(),
                    NODE_ENV: Joi.string()
                        .valid(...validNodeEnvList)
                        .required(),
                    PORT: Joi.number().min(1).max(65535).required(),

                    REDIS_HOST: Joi.string().required(),
                    REDIS_PASSWORD: Joi.string().allow('').optional(),
                    REDIS_PORT: Joi.number().min(1).max(65535).required(),
                }),
        };
    }

    public static getLoggerConfig(): Params {
        const { CLUSTERING, LOG_LEVEL, NODE_ENV } = process.env;

        return {
            pinoHttp: {
                autoLogging: true,
                base: CLUSTERING === 'true' ? { pid: process.pid } : {},
                customAttributeKeys: {
                    responseTime: 'timeSpent',
                },
                // formatters: { level: (level) => ({ level }) },
                level:
                    LOG_LEVEL ||
                    (NODE_ENV === NodeEnv.PRODUCTION ? LogLevel.INFO : LogLevel.TRACE),
                serializers: {
                    req(request: IncomingMessage) {
                        return {
                            // headers: request.headers,
                            method: request.method,
                            url: request.url,
                            // body: request.readable && request.read(),
                        };
                    },
                    res(reply: ServerResponse) {
                        return {
                            // headers: reply.getHeader,
                            statusCode: reply.statusCode,
                        };
                    },
                },
                transport:
                    NODE_ENV !== NodeEnv.PRODUCTION
                        ? {
                            targets: [{

                                options: {
                                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                                },
                                target: 'pino-pretty',
                            }, {
                                target: 'pino-mongodb',
                                options: {
                                    uri: 'mongodb://localhost:27017/',
                                    database: 'logs',
                                    collection: 'log-collection',
                                    mongoOptions: {
                                        //   auth: {
                                        //     username: 'one',
                                        //     password: 'two'
                                        //   }
                                    }
                                }
                            }
                            ]
                        }
                        : null,
            },
        };
    }
}
