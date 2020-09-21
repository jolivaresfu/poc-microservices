import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('getUserById')
  async getUser(userId: string,): Promise<Users> {
    return await this.usersService.getUserById(userId);
  }
}
