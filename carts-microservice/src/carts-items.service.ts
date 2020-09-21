import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { CartsItems } from './entities/carts-items.entity';
import { Carts } from './entities/carts.entity';

@Injectable()
export class CartsItemsService {
  private readonly logger = new Logger(CartsItemsService.name);
  constructor(
    @InjectRepository(CartsItems)
    private readonly cartsItemRepository: Repository<CartsItems>,
  ) { }

  async findEntities(cartItemsQueryParams: object): Promise<CartsItems[]> {
    const cartItemsFound = await this.cartsItemRepository.find(cartItemsQueryParams);
    if (cartItemsFound === undefined) {
      throw new HttpException(
        `Carts Items not found. ${JSON.stringify(cartItemsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Cart Items Found ${inspect(cartItemsFound)}`);
    return cartItemsFound;
  }

  async getCartItemsByCartId(id: string): Promise<CartsItems[]> {
    this.logger.log(`input ${id}`);
    return await this.findEntities({ cart_id: id });
  }

}
