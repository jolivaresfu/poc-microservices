import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

// create TCP REDIS client to get messages
const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://redis-docker:6379',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);

  app.listen(() => logger.log('Users Microservice is listening...'))
}
bootstrap();
