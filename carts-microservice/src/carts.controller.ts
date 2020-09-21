import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { CartsItemsService } from './carts-items.service';
import { CartsItems } from './entities/carts-items.entity';
import { Carts } from './entities/carts.entity';

@Controller()
export class CartsController {

  // Create logger
  private readonly logger = new Logger(CartsController.name)

  constructor(
    // Inject carts service and carts items service
    private readonly cartsService: CartsService,
    private readonly cartsItemService: CartsItemsService,
  ) { }

  // Create message pattern to get carts by specific user id
  @MessagePattern('getCartsByUserId')
  async getCarts(userId: string): Promise<Carts> {

    this.logger.log(`Message received in 'getCartsByUserId': ${userId}`);
    return await this.cartsService.getCartByUserId(userId);
  }

  // Create message pattern to get carts by specific order
  @MessagePattern('getCartsByOrder')
  async getCartsByOrderId(orderId: string): Promise<Carts> {

    this.logger.log(`Message received in 'getCartsByOrder': ${orderId}`);
    return await this.cartsService.getCartByOrderId(orderId);
  }

  // Create message pattern to get carts items by specific cart
  @MessagePattern('getCartsItemsByCartId')
  async getCartsItems(userId: string): Promise<CartsItems[]> {

    this.logger.log(`Message received in 'getCartsItemsByCartId': ${userId}`);
    return await this.cartsItemService.getCartItemsByCartId(userId);
  }
}
