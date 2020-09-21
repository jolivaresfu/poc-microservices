import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {

  // Create Logger
  private readonly logger = new Logger(ProductsController.name);

  // Inject products service
  constructor(private readonly productsService: ProductsService) { }


  // create message pattern to receive messages
  @MessagePattern('getProductsById')
  async getCartsItems(productId: string): Promise<Products> {

    this.logger.log(`Message received in 'getProductsById': ${productId}`);
    return await this.productsService.getProductsById(productId);
  }
}
