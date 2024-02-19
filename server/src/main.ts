import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001'],
  });
  app.use(express.json({ limit: '50mb' }));
  const port = app.get(ConfigService).getOrThrow('SERVER_PORT')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port || 4000);
}
bootstrap();
