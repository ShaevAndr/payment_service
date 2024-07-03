import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from '@modules/payment/payment.module';
import { LoggerModule } from 'nestjs-pino';
import { AppConfig } from './app.config';
import { HttpLoggerMiddleware } from '@modules/httpLogger/midlleware/logger.midlleware';
import { HttpLogsModule } from '../httpLogger/logger.module';

@Module({
  imports: [
    HttpLogsModule,
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
    PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}