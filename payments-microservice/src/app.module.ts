import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

import * as path from 'path';
import { Payments } from './entities/payment.entity';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    PaymentsService
  ],
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {

        const mergedOpts = {
          ...config.get('payments-db'),
          // logger: new Logger('Custom'),// TODO: Log querys and stuff
        };
        return mergedOpts;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Payments
    ])
  ],
  controllers: [PaymentsController],
})
export class AppModule { }
