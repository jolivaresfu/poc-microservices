import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  // Create Logger
  private readonly logger = new Logger(UsersController.name);
  // Inject user service
  constructor(private readonly usersService: UsersService) { }



  // Create message patter to get messages from tcp redis
  @MessagePattern('getUserById')
  async getUser(userId: string,): Promise<Users> {

    this.logger.log(`Message received in 'getUserById': ${userId}`);
    return await this.usersService.getUserById(userId);
  }
}
