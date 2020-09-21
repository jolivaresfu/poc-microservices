import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { CartsItems } from './entities/carts-items.entity';
import { Carts } from './entities/carts.entity';

@Injectable()
export class CartsItemsService {

  // Create logger
  private readonly logger = new Logger(CartsItemsService.name);
  constructor(
    // Inject entity
    @InjectRepository(CartsItems)
    private readonly cartsItemRepository: Repository<CartsItems>,
  ) { }

  // function to find carts items in db
  async findEntities(cartItemsQueryParams: object): Promise<CartsItems[]> {

    // cart items found
    const cartItemsFound = await this.cartsItemRepository.find(cartItemsQueryParams);

    // if cart items dont exists
    if (cartItemsFound === undefined) {
      this.logger.log(`Cart items not found ${JSON.stringify(cartItemsQueryParams)}`);
      throw new HttpException(
        `Carts Items not found. ${JSON.stringify(cartItemsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`Cart Items Found ${inspect(cartItemsFound)}`);
    return cartItemsFound;
  }


  // function to pass the property to search in DB
  async getCartItemsByCartId(cartId: string): Promise<CartsItems[]> {

    this.logger.log(`Finding Cart items by Cart ID: ${cartId}`);
    return await this.findEntities({ cart_id: cartId });
  }

}
