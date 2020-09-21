import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Carts } from './entities/carts.entity';

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name);
  constructor(
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
  ) { }

  async findOne(cartsQueryParams: object): Promise<Carts> {
    const cartFound = await this.cartsRepository.findOne(cartsQueryParams);
    if (cartFound === undefined) {
      throw new HttpException(
        `Carts not found. ${JSON.stringify(cartsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Cart Found ${inspect(cartFound)}`);
    return cartFound;
  }

  async getCartByUserId(id: string): Promise<Carts> {
    this.logger.log(`input ${id}`);
    return await this.findOne({ user_id: id });
  }

  async getCartByOrderId(orderId: string): Promise<Carts> {
    this.logger.log(`input ${orderId}`);
    return await this.findOne({ order_id: orderId });
  }

}
