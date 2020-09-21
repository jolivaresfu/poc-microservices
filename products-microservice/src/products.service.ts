import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) { }

  async findOne(productsQueryParams: object): Promise<Products> {
    const productFound = await this.productsRepository.findOne(productsQueryParams);
    if (productFound === undefined) {
      throw new HttpException(
        `Products not found. ${JSON.stringify(productsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Cart Found ${inspect(productFound)}`);
    return productFound;
  }

  async getProductsById(id: string): Promise<Products> {
    this.logger.log(`input ${id}`);
    return await this.findOne({ id });
  }


}
