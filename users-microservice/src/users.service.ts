import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {

  // Create Logger
  private readonly logger = new Logger(UsersService.name);

  // Inject user entity
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async findOne(userQueryParams: object): Promise<Users> {

    // find user in db
    const userEntityFound = await this.userRepository.findOne(userQueryParams);

    // if user dont exist
    if (userEntityFound === undefined) {
      throw new HttpException(
        `User not found. ${JSON.stringify(userQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`User Found ${inspect(userEntityFound)}`);
    return userEntityFound;
  }


  // function to send data to the function that search entities
  async getUserById(id: string): Promise<Users> {
    return await this.findOne({ id });
  }

}
