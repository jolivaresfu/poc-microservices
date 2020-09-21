import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Carts } from './entities/carts.entity';

@Injectable()
export class CartsService {

  // Create logger
  private readonly logger = new Logger(CartsService.name);
  constructor(

    // Inject entity Carts
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
  ) { }


  // Function to find entities in the db by a particular property
  async findOne(cartsQueryParams: object): Promise<Carts> {

    // find a cart
    const cartFound = await this.cartsRepository.findOne(cartsQueryParams);

    // if carts don't exist
    if (cartFound === undefined) {
      this.logger.log(`Cart not found ${JSON.stringify(cartsQueryParams)}`);
      throw new HttpException(
        `Carts not found. ${JSON.stringify(cartsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`Cart Found ${inspect(cartFound)}`);
    return cartFound;
  }


  // Function to pass the parameter to find in db
  async getCartByUserId(userId: string): Promise<Carts> {

    this.logger.log(`Finding Cart by user ID: ${userId}`);
    return await this.findOne({ user_id: userId });
  }

  // Function to pass the parameter to find in db
  async getCartByOrderId(orderId: string): Promise<Carts> {

    this.logger.log(`Finding Cart by order ID: ${orderId}`);
    return await this.findOne({ order_id: orderId });
  }

}
