import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Orders } from './entities/orders.entity';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }


  @MessagePattern('getOrderById')
  async getOrderById(orderId: string): Promise<Orders> {
    return await this.ordersService.getOrderById(orderId);

  }

  @MessagePattern('getOrderByUserId')
  async getOrderByUserId(userId: string): Promise<Orders[]> {
    const orders = await this.ordersService.getOrderByUserId(userId);
    return [].concat(...orders);
  }
}
