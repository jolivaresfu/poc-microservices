import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) { }

  async findOne(ordersQueryParams: object): Promise<Orders> {
    const orderFound = await this.ordersRepository.findOne(ordersQueryParams);
    if (orderFound === undefined) {
      throw new HttpException(
        `Carts not found. ${JSON.stringify(ordersQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Single Order Found ${inspect(orderFound)}`);
    return orderFound;
  }

  async findEntities(ordersQueryParams: object): Promise<Orders[]> {
    const orderFound = await this.ordersRepository.find(ordersQueryParams);
    if (orderFound === undefined) {
      throw new HttpException(
        `Orders not found. ${JSON.stringify(ordersQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Orders Found ${inspect(orderFound)}`);
    return orderFound;
  }


  async getOrderById(data: string): Promise<Orders> {
    return await this.findOne({ id: data })
  }
  async getOrderByUserId(data: string): Promise<Orders[]> {
    return await this.findEntities({ user_id: data })
  }


}
