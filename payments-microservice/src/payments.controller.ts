import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Payments } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {

  // Create Logger
  private readonly logger = new Logger(PaymentsController.name);

  // Inject payment service
  constructor(private readonly paymentService: PaymentsService) { }


  // Create message pattern to get a payment by external reference id
  @MessagePattern('getPaymentByExternalReferenceId')
  async getCartsItems(userId: string): Promise<Payments> {
    return await this.paymentService.getPayments(userId);
  }

  // Create message pattern to get a payment by order id
  @MessagePattern('getPaymentByOrderId')
  async getPaymentsByOrderId(orderId: string): Promise<Payments> {
    return await this.paymentService.getPaymentByOrderId(orderId);
  }
}
