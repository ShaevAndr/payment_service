import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { ClientOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Запуск HTTP сервера
  await app.listen(3000);

  // Запуск gRPC сервера
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: join(__dirname, './proto/payment.proto'),
      url: '0.0.0.0:5000',
    },
  });
  await grpcApp.listen();
}

bootstrap();
