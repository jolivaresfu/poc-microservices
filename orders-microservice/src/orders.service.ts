import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {

  // create logger
  private readonly logger = new Logger(OrdersService.name);

  // inject Order entity
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) { }

  // function to find entities in db by specific property
  async findOne(ordersQueryParams: object): Promise<Orders> {

    // find order in db
    const orderFound = await this.ordersRepository.findOne(ordersQueryParams);

    // if order not found
    if (orderFound === undefined) {
      throw new HttpException(
        `Order not found. ${JSON.stringify(ordersQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`Single Order Found ${inspect(orderFound)}`);
    return orderFound;
  }

  // find more than one order
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

  // function to send data to the find function
  async getOrderById(data: string): Promise<Orders> {
    return await this.findOne({ id: data })
  }

  // function to send data to the find function
  async getOrderByUserId(data: string): Promise<Orders[]> {
    return await this.findEntities({ user_id: data })
  }


}
