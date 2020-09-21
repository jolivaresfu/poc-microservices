import { forwardRef, Injectable, Logger } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { inspect } from "util";

@Injectable()
export class AppService {
  private client: ClientProxy;

  private readonly logger = new Logger(AppService.name);
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis-docker:6379'
      },
    })
  }


  async sweepProducts(cartItems) {
    const products = [];
    for (const items of cartItems) {
      products.push(await this.client.send<any, string>('getProductsById', items.product_id).toPromise());
    }

    return products;
  }

  async getProductsPaidByUserId(data: string) {

    let products = [];
    const orders = await this.client.send<any, string>('getOrderByUserId', data).toPromise();
    // this.logger.log('orders', inspect(orders));
    for (const element of orders) {
      const payment = await this.client.send<any, string>('getPaymentByOrderId', element.id).toPromise();
      // this.logger.log('payment', inspect(payment));
      if (payment.status === 'PAID') {
        const cart = await this.client.send<any, string>('getCartsByOrder', payment.order_id).toPromise();
        const cartItems = await this.client.send<any, string>('getCartsItemsByCartId', cart.id).toPromise();
        products.push(await this.sweepProducts(cartItems));
      }
    }

    return [].concat(...products);
  }


  async getProductsPaymentExternalReference(data: string) {

    const products = [];
    const payment = await this.client.send<any, string>('getPaymentByExternalReferenceId', data).toPromise();
    this.logger.log('payment', inspect(payment.order_id));
    const cart = await this.client.send<any, string>('getCartsByOrder', payment.order_id).toPromise();
    this.logger.log('cart', inspect(cart));

    const cartItems = await this.client.send<any, string>('getCartsItemsByCartId', cart.id).toPromise();
    products.push(await this.sweepProducts(cartItems));

    return [].concat(...products);

  }


  async getPorductsCartsByUserId(data: string) {

    const products = [];
    const cart = await this.client.send<any, string>('getCartsByUserId', data).toPromise();
    const cartItems = await this.client.send<any, string>('getCartsItemsByCartId', cart.id).toPromise();

    products.push(await this.sweepProducts(cartItems));

    return [].concat(...products);

  }


  async getOrder(data: string) {

    return await this.client.send<any, string>('getOrderById', data).toPromise();
  }
}
