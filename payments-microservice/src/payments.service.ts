import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspect } from 'util';
import { Payments } from './entities/payment.entity';

@Injectable()
export class PaymentsService {

  // create logger
  private readonly logger = new Logger(PaymentsService.name);

  // Inject payments entity
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepository: Repository<Payments>,
  ) { }

  async findOne(paymentsQueryParams: object): Promise<Payments> {

    // find payment in the db
    const paymentFound = await this.paymentsRepository.findOne(paymentsQueryParams);

    // if payment doesn't exist
    if (paymentFound === undefined) {
      throw new HttpException(
        `Payment not found. ${JSON.stringify(paymentsQueryParams)}`,
        HttpStatus.NOT_FOUND,
      );
    }
    
    this.logger.log(`Payment Found ${inspect(paymentFound)}`);
    return paymentFound;
  }



  // function to send data to the function that find entieies in the database
  async getPayments(data: string): Promise<Payments> {
    return await this.findOne({ external_reference_id: data })
  }

  // function to send data to the function that find entieies in the database
  async getPaymentByOrderId(data: string): Promise<Payments> {
    return await this.findOne({ order_id: data })
  }


}
