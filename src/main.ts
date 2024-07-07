import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: join(__dirname, 'proto/payment.proto'),
    },
    bufferLogs: true
  });

  app.useLogger(app.get(Logger))
  await app.listen();
}
bootstrap();
