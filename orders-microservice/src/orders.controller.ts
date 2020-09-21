import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Orders } from './entities/orders.entity';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {

  // create logger
  private readonly logger = new Logger(OrdersController.name);

  // inject order service
  constructor(private readonly ordersService: OrdersService) { }

  // Create message pattern to get an order by id
  @MessagePattern('getOrderById')
  async getOrderById(orderId: string): Promise<Orders> {

    this.logger.log(`Message received in 'getOrderById': ${orderId}`);
    return await this.ordersService.getOrderById(orderId);
  }

  // Create message pattern to get orders by user id
  @MessagePattern('getOrderByUserId')
  async getOrderByUserId(userId: string): Promise<Orders[]> {

    this.logger.log(`Message received in 'getOrderByUserId': ${userId}`);
    const orders = await this.ordersService.getOrderByUserId(userId);
    return [].concat(...orders);
  }
}
