import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @MessagePattern('getProductsById')
  async getCartsItems(productId: string): Promise<Products> {
    return await this.productsService.getProductsById(productId);
  }
}
