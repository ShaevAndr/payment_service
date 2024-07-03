import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import * as knexConfig from '../../../knexfile';


@Module({
  imports: [
    KnexModule.forRoot({
      config: knexConfig[process.env.NODE_ENV || 'development'],
    }),
  ],
})
export class DatabaseModule { }