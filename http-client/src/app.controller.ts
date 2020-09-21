import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor
    (private readonly appService: AppService) { }


  // Get all products paid by a user ID
  @Get('productsPaids/:userId')
  async getProductsByUserId(@Param('userId') userId: string) {

    this.logger.log(`Getting Products paids by USER ID: ${userId}`);
    return await this.appService.getProductsPaidByUserId(userId);
  }

  // Get all products asociated to a order by External Reference Id Field
  @Get('productsByExternalReference/:externalReference')
  async getOrderByid(@Param('externalReference') externalReference: string) {

    this.logger.log(`Getting Products by External Reference id Payment: ${externalReference}`);
    return await this.appService.getProductsPaymentExternalReference(externalReference);
  }


  // Get all products in a cart by user id
  @Get('productsInCart/:userId')
  async getProductsCart(@Param('userId') userId: string) {

    this.logger.log(`Getting Products in a user cart by user ID: ${userId}`);
    return await this.appService.getPorductsCartsByUserId(userId);
  }

}
