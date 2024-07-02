import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ILogs } from '@/core/interfaces/logs.interface';


@Injectable()
export class LogRepository {
    constructor(
        @Inject('LOG_MODEL')
        private logModel: Model<ILogs>,
    ) { }

    async create(log: ILogs): Promise<ILogs> {
        const createdCat = new this.logModel(log);
        return createdCat.save();
    }

}