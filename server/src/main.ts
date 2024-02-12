import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = app.get(ConfigService).getOrThrow('SERVER_PORT')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);
}
bootstrap();
