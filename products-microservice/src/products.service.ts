import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {

  // Create logger
  private readonly logger = new Logger(ProductsService.name);

  // Inject products repository
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) { }


  async findOne(productsQueryParams: object): Promise<Products> {

    // find product in db
    const productFound = await this.productsRepository.findOne(productsQueryParams);
    if (productFound === undefined) {
      throw new HttpException(
        `Products not found. ${JSON.stringify(productsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Product Found ${inspect(productFound)}`);
    return productFound;
  }

  // function to send the data to the function that finds entities
  async getProductsById(id: string): Promise<Products> {
    return await this.findOne({ id });
  }

}
