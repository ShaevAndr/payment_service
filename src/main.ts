import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger } from 'nestjs-pino';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger))
  console.log(PORT)
  await app.listen(3000);
}
bootstrap();
