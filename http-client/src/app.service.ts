require('dotenv').config();
import { Injectable, Logger } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {

    // Create TCP Redis client to send messages to the differents microservices
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL,
      },
    })
  }


  // Return the products associated to the cart items
  async sweepProducts(cartItems) {

    const products = [];
    for (const items of cartItems) {
      products.push(await this.client.send<any, string>('getProductsById', items.product_id).toPromise());
    }

    return products;
  }

  async getProductsPaidByUserId(data: string) {

    let products = [];

    // find orders associated to a user by id
    const orders = await this.client.send<any, string>('getOrderByUserId', data).toPromise();


    // Find orders that been PAID 
    for (const element of orders) {
      const payment = await this.client.send<any, string>('getPaymentByOrderId', element.id).toPromise();
      if (payment.status === 'PAID') {
        // If the order is PAID, now we can find the products of this order

        // find cart by order id
        const cart = await this.client.send<any, string>('getCartsByOrder', payment.order_id).toPromise();

        // find cart items by cart id
        const cartItems = await this.client.send<any, string>('getCartsItemsByCartId', cart.id).toPromise();

        // find products related to this cart items 
        products.push(await this.sweepProducts(cartItems));
      }
    }
    // return only one array of products instead of array of arrays
    return [].concat(...products);
  }


  async getProductsPaymentExternalReference(data: string) {

    const products = [];

    // find payment by external reference id
    const payment = await this.client.send<any, string>('getPaymentByExternalReferenceId', data).toPromise();

    // find cart by order id
    const cart = await this.client.send<any, string>('getCartsByOrder', payment.order_id).toPromise();

    // find cart items by cart id
    const cartItems = await this.client.send<any, string>('getCartsItemsByCartId', cart.id).toPromise();

    // find products related to this cart items 
    products.push(await this.sweepProducts(cartItems));

    // return only one array of products instead of array of arrays
    return [].concat(...products);

  }


  async getPorductsCartsByUserId(data: string) {

    const products = [];

    // get cart by user id
    const cart = await this.client.send<any, string>('getCartsByUserId', data).toPromise();

    // get cart items by an user id
    const cartItems = await this.client.send<any, string>('getCartsItemsByCartId', cart.id).toPromise();

    // find products related to this cart items 
    products.push(await this.sweepProducts(cartItems));

    // return only one array of products instead of array of arrays
    return [].concat(...products);

  }

}
