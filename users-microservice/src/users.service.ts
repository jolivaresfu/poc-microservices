import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async findOne(userQueryParams: object): Promise<Users> {
    const userEntityFound = await this.userRepository.findOne(userQueryParams);
    if (userEntityFound === undefined) {
      throw new HttpException(
        `User not found. ${JSON.stringify(userQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`User Found ${inspect(userEntityFound)}`);
    return userEntityFound;
  }

  async getUserById(id: string): Promise<Users> {
    this.logger.log(`input ${id}`);
    return await this.findOne({ id });
  }

}
