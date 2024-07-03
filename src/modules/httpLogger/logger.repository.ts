import { Injectable, Inject } from '@nestjs/common';
import { ILogs } from '@/core/interfaces/logs.interface';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';


@Injectable()
export class LogRepository {
    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    async create(log: ILogs): Promise<ILogs[]> {

        return await this.knex.table('http_logs').insert(log).returning('*');
    }

}
