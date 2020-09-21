import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import * as path from 'path';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    UsersService
  ],
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {

        const mergedOpts = {
          ...config.get('users-db'),
          // logger: new Logger('Custom'),// TODO: Log querys and stuff
        };
        return mergedOpts;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Users
    ])
  ],
  controllers: [UsersController],
})
export class AppModule { }
