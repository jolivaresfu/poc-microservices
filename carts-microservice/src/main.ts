require('dotenv').config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: process.env.REDIS_URL,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);

  app.listen(() => logger.log('Carts Microservice is listening...'))
}
bootstrap();
