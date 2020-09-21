import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import * as path from 'path';
import { Products } from 'src/entities/products.entity';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    ProductsService
  ],
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const mergedOpts = {
          ...config.get('products-db'),
          // logger: new Logger('Custom'),// TODO: Log querys and stuff
        };
        return mergedOpts;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Products
    ])
  ],
  controllers: [ProductsController],
})
export class AppModule { }
