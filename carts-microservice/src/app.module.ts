import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Carts } from './entities/carts.entity';
import * as path from 'path';
import { CartsItems } from './entities/carts-items.entity';
import { CartsItemsService } from './carts-items.service';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    CartsService,
    CartsItemsService
  ],
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({

      // load database
      useFactory: (config: ConfigService) => {

        // get carts-db config file
        const mergedOpts = {
          ...config.get('carts-db'),
          // logger: new Logger('Custom'),// TODO: Log querys and stuff
        };
        return mergedOpts;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Carts,
      CartsItems
    ])
  ],
  controllers: [CartsController],
})
export class AppModule { }
