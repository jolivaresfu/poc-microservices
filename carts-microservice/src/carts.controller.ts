import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { CartsItemsService } from './carts-items.service';
import { CartsItems } from './entities/carts-items.entity';
import { Carts } from './entities/carts.entity';

@Controller()
export class CartsController {
  private readonly logger = new Logger(CartsController.name)

  constructor(
    private readonly cartsService: CartsService,
    private readonly cartsItemService: CartsItemsService,
  ) { }

  @MessagePattern('getCartsByUserId')
  async getCarts(userId: string): Promise<Carts> {
    return await this.cartsService.getCartByUserId(userId);
  }

  @MessagePattern('getCartsByOrder')
  async getCartsByOrderId(orderId: string): Promise<Carts> {
    return await this.cartsService.getCartByOrderId(orderId);
  }

  @MessagePattern('getCartsItemsByCartId')
  async getCartsItems(userId: string): Promise<CartsItems[]> {
    return await this.cartsItemService.getCartItemsByCartId(userId);
  }
}
