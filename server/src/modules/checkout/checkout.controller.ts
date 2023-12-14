import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import Stripe from 'stripe';

// THIS IS ALL ABOUT STRIPE API INTREGRATION
// BY SAJIB HOSEN
// EMAIL sajib.201h@gmail.com
// DATE: 14.12.2023

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  // Connected Accounts
  // https://stripe.com/docs/api/connected-accounts

  @Post('create-user')
  async create(@Body() createCheckoutDto: any) {
    return await this.checkoutService.createUser(createCheckoutDto);
  }

  @Get('customer/:userId')
  async getCustomer(@Param('userId') userId: string) {
    return await this.checkoutService.getCustomer(userId);
  }

  @Put('customer-up/:userId')
  async updateCustomer(@Param('userId') userId: string) {
    return await this.checkoutService.updateUser(userId);
  }

  @Get('customer-list')
  async getCustomerList() {
    return await this.checkoutService.listOfCustomers();
  }

  @Post('customer-del')
  async delCustomer() {
    return await this.checkoutService.deleteCustimer('cus_Ov8oCulpvGSALA');
  }

  // Balance
  // https://stripe.com/docs/api/balance/balance_object

  @Get('balance')
  async getBalance() {
    return await this.checkoutService.getBalance();
  }

  @Get('balance-list')
  async getBalanceTransactions() {
    return await this.checkoutService.getBalanceTransactions(15);
  }

  @Get('balance-list/:transId')
  async getATransaction(@Param('transId') transId: string) {
    return await this.checkoutService.getATransaction(transId);
  }

  // Payment Inten
  // https://stripe.com/docs/api/payment_intents

  @Post('create-method/:customerId') // yet to test
  async createMethod(
    @Body() paymentMethod: Stripe.PaymentMethod,
    @Param('customerId') customerId: string,
  ) {
    return await this.checkoutService.attachMethodToCuatomer(
      paymentMethod,
      customerId,
    );
  }

  @Get('method/:methodId')
  async getMethod(@Param('methodId') methodId: string) {
    return await this.checkoutService.getPaymentMethod(methodId);
  }

  @Get('methods-list/:customerId')
  async getMethods(@Param('customerId') customerId: string) {
    return await this.checkoutService.paymentMethodList(customerId);
  }
}
