import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Payments } from './entities/payment.entity';

@Injectable()
export class PaymentsService {

  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payments)
    private readonly cartsRepository: Repository<Payments>,
  ) { }

  async findOne(paymentsQueryParams: object): Promise<Payments> {
    const paymentFound = await this.cartsRepository.findOne(paymentsQueryParams);
    if (paymentFound === undefined) {
      throw new HttpException(
        `Carts not found. ${JSON.stringify(paymentsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log(`Payment Found ${inspect(paymentFound)}`);
    return paymentFound;
  }


  async getPayments(data: string): Promise<Payments> {
    return await this.findOne({ external_reference_id: data })
  }

  async getPaymentByOrderId(data: string): Promise<Payments> {
    return await this.findOne({ order_id: data })
  }


}
