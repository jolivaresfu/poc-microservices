import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Payments } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) { }

  @MessagePattern('getPaymentByExternalReferenceId')
  async getCartsItems(userId: string): Promise<Payments> {
    return await this.paymentService.getPayments(userId);
  }

  @MessagePattern('getPaymentByOrderId')
  async getPaymentsByOrderId(orderId: string): Promise<Payments> {
    return await this.paymentService.getPaymentByOrderId(orderId);
  }
}
