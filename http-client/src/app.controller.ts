import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor
    (private readonly appService: AppService) { }

  @Get('productsPaids/:userId')
  async getProductsByUserId(@Param('userId') userId: string) {
    this.logger.log(userId);
    return await this.appService.getProductsPaidByUserId(userId);
  }

  @Get('productsByExternalReference/:externalReference')
  async getOrderByid(@Param('externalReference') externalReference: string) {

    return await this.appService.getProductsPaymentExternalReference(externalReference);
  }


  @Get('productsInCart/:userId')
  async getProductsCart(@Param('userId') orderId: string) {

    return await this.appService.getPorductsCartsByUserId(orderId);
  }

  @Get('order/:orderId')
  async getOrder(@Param('orderId') orderId: string) {

    return await this.appService.getOrder(orderId);
  }

}
